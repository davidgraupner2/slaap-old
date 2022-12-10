import { Injectable, Logger } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class TenantService {
  constructor(@InjectModel() private readonly knex: Knex, private logger: Logger, private configService: ConfigService) {}

  /* 
  Checks whether the requested tenant is valid for the requesting user
  - Is the Tenant Active
  - Does the user have access to the tenant
  - Is the Tenant Public and user is MSP User */
  async isValidTenantForUser(tenantId: any, userId: any, userIsMSP: boolean): Promise<boolean> {
    // Get the tenant record associated with the id passed in
    const tenant = await this.getTenantById(tenantId);
    if (!tenant) {
      // Tenant not found (could be inactive - see logs)
      return false;
    }

    // Check that only MSP Users can login to the public tenant
    if (tenant.is_public && !userIsMSP) {
      this.logger.warn(
        `Tenant '${tenant.name}' with ID '${tenantId}' is the public tenant. User with ID '${userId} is not an MSP User and cannot login to this tenant`,
        this.constructor.name,
      );
      return false;
    }

    // Final check - check the user has access to the tenant requested
    if (!(await this.userHasAccessToTenant(userId, tenantId))) {
      this.logger.warn(`User with ID '${userId} has NO ACCESS to Tenant '${tenant.name}' with ID '${tenantId}'.`, this.constructor.name);
      return false;
    }

    // all test passed validation
    return true;
  }

  /* 
    Gets and returns a specified tenant by id
  */
  async getTenantById(id: any) {
    try {
      // Get the tenant from the database
      let tenant = await this.knex.withSchema(this.configService.get('public_schema_name')).table('tenant').where('id', id).first();

      // Check whether the tenant is active
      if (tenant && !tenant.is_active) {
        // Tenant is not active
        this.logger.warn(`Tenant '${tenant.name}' with ID '${id} is not active`, this.constructor.name);
        tenant = undefined;
      }

      // Return the tenant record to the caller
      return tenant;
    } catch (e: any) {
      this.logger.error(e.message, e, this.constructor.name);
      return undefined;
    }
  }

  /* 
  Checks whether a specific user has been given access to a tenant
  */
  async userHasAccessToTenant(userId: any, tenantId: any) {
    const has_access = await this.knex.withSchema(this.configService.get('public_schema_name')).table('tenant_user').where('tenant_id', tenantId).where('user_id', userId).first();
    if (has_access) {
      // User has access to the requested tenant
      return true;
    } else {
      // User does not have have access to the requested tenant
      return false;
    }
  }
}
