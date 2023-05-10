import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios'; 

declare namespace Components {
    namespace Schemas {
        export interface CustomRegister {
            username?: string;
            email: string; // email
            password1: string;
            password2: string;
            first_name: string;
            last_name: string;
        }
        export interface Login {
            username?: string;
            email?: string; // email
            password: string;
        }
        export interface PasswordChange {
            new_password1: string;
            new_password2: string;
        }
        /**
         * Serializer for requesting a password reset e-mail.
         */
        export interface PasswordReset {
            email: string; // email
        }
        /**
         * Serializer for confirming a password reset attempt.
         */
        export interface PasswordResetConfirm {
            new_password1: string;
            new_password2: string;
            uid: string;
            token: string;
        }
        /**
         * User model w/o password
         */
        export interface PatchedUserDetails {
            /**
             * ID
             */
            pk?: number;
            /**
             * Email address
             */
            email?: string; // email
            first_name?: string;
            last_name?: string;
        }
        export interface RestAuthDetail {
            detail: string;
        }
        /**
         * Serializer for Token model.
         */
        export interface Token {
            key: string;
        }
        /**
         * User model w/o password
         */
        export interface UserDetails {
            /**
             * ID
             */
            pk: number;
            /**
             * Email address
             */
            email: string; // email
            first_name?: string;
            last_name?: string;
        }
    }
}
declare namespace Paths {
    namespace AuthLoginCreate {
        export type RequestBody = Components.Schemas.Login;
        namespace Responses {
            export type $200 = /* Serializer for Token model. */ Components.Schemas.Token;
        }
    }
    namespace AuthLogoutCreate {
        namespace Responses {
            export type $200 = Components.Schemas.RestAuthDetail;
        }
    }
    namespace AuthPasswordChangeCreate {
        export type RequestBody = Components.Schemas.PasswordChange;
        namespace Responses {
            export type $200 = Components.Schemas.RestAuthDetail;
        }
    }
    namespace AuthPasswordResetConfirmCreate {
        export type RequestBody = /* Serializer for confirming a password reset attempt. */ Components.Schemas.PasswordResetConfirm;
        namespace Responses {
            export type $200 = Components.Schemas.RestAuthDetail;
        }
    }
    namespace AuthPasswordResetCreate {
        export type RequestBody = /* Serializer for requesting a password reset e-mail. */ Components.Schemas.PasswordReset;
        namespace Responses {
            export type $200 = Components.Schemas.RestAuthDetail;
        }
    }
    namespace AuthRegistrationCreate {
        export type RequestBody = Components.Schemas.CustomRegister;
        namespace Responses {
            export type $201 = /* Serializer for Token model. */ Components.Schemas.Token;
        }
    }
    namespace AuthSetCsrfRetrieve {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace AuthUserPartialUpdate {
        export type RequestBody = /* User model w/o password */ Components.Schemas.PatchedUserDetails;
        namespace Responses {
            export type $200 = /* User model w/o password */ Components.Schemas.UserDetails;
        }
    }
    namespace AuthUserRetrieve {
        namespace Responses {
            export type $200 = /* User model w/o password */ Components.Schemas.UserDetails;
        }
    }
    namespace AuthUserUpdate {
        export type RequestBody = /* User model w/o password */ Components.Schemas.UserDetails;
        namespace Responses {
            export type $200 = /* User model w/o password */ Components.Schemas.UserDetails;
        }
    }
}

export interface OperationMethods {
  /**
   * auth_login_create - Check the credentials and return the REST Token
   * if the credentials are valid and authenticated.
   * Calls Django Auth login method to register User ID
   * in Django session framework
   * 
   * Accept the following POST parameters: username, password
   * Return the REST Framework Token Object's key.
   */
  'auth_login_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthLoginCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthLoginCreate.Responses.$200>
  /**
   * auth_logout_create - Calls Django logout method and delete the Token object
   * assigned to the current User object.
   * 
   * Accepts/Returns nothing.
   */
  'auth_logout_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthLogoutCreate.Responses.$200>
  /**
   * auth_password_change_create - Calls Django Auth SetPasswordForm save method.
   * 
   * Accepts the following POST parameters: new_password1, new_password2
   * Returns the success/fail message.
   */
  'auth_password_change_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthPasswordChangeCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthPasswordChangeCreate.Responses.$200>
  /**
   * auth_password_reset_create - Calls Django Auth PasswordResetForm save method.
   * 
   * Accepts the following POST parameters: email
   * Returns the success/fail message.
   */
  'auth_password_reset_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthPasswordResetCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthPasswordResetCreate.Responses.$200>
  /**
   * auth_password_reset_confirm_create - Password reset e-mail link is confirmed, therefore
   * this resets the user's password.
   * 
   * Accepts the following POST parameters: token, uid,
   *     new_password1, new_password2
   * Returns the success/fail message.
   */
  'auth_password_reset_confirm_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthPasswordResetConfirmCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthPasswordResetConfirmCreate.Responses.$200>
  /**
   * auth_registration_create
   */
  'auth_registration_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthRegistrationCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthRegistrationCreate.Responses.$201>
  /**
   * auth_set_csrf_retrieve
   */
  'auth_set_csrf_retrieve'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthSetCsrfRetrieve.Responses.$200>
  /**
   * auth_user_retrieve - Reads and updates UserModel fields
   * Accepts GET, PUT, PATCH methods.
   * 
   * Default accepted fields: username, first_name, last_name
   * Default display fields: pk, username, email, first_name, last_name
   * Read-only fields: pk, email
   * 
   * Returns UserModel fields.
   */
  'auth_user_retrieve'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthUserRetrieve.Responses.$200>
  /**
   * auth_user_update - Reads and updates UserModel fields
   * Accepts GET, PUT, PATCH methods.
   * 
   * Default accepted fields: username, first_name, last_name
   * Default display fields: pk, username, email, first_name, last_name
   * Read-only fields: pk, email
   * 
   * Returns UserModel fields.
   */
  'auth_user_update'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthUserUpdate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthUserUpdate.Responses.$200>
  /**
   * auth_user_partial_update - Reads and updates UserModel fields
   * Accepts GET, PUT, PATCH methods.
   * 
   * Default accepted fields: username, first_name, last_name
   * Default display fields: pk, username, email, first_name, last_name
   * Read-only fields: pk, email
   * 
   * Returns UserModel fields.
   */
  'auth_user_partial_update'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthUserPartialUpdate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthUserPartialUpdate.Responses.$200>
}

export interface PathsDictionary {
  ['/auth/login/']: {
    /**
     * auth_login_create - Check the credentials and return the REST Token
     * if the credentials are valid and authenticated.
     * Calls Django Auth login method to register User ID
     * in Django session framework
     * 
     * Accept the following POST parameters: username, password
     * Return the REST Framework Token Object's key.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthLoginCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthLoginCreate.Responses.$200>
  }
  ['/auth/logout/']: {
    /**
     * auth_logout_create - Calls Django logout method and delete the Token object
     * assigned to the current User object.
     * 
     * Accepts/Returns nothing.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthLogoutCreate.Responses.$200>
  }
  ['/auth/password/change/']: {
    /**
     * auth_password_change_create - Calls Django Auth SetPasswordForm save method.
     * 
     * Accepts the following POST parameters: new_password1, new_password2
     * Returns the success/fail message.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthPasswordChangeCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthPasswordChangeCreate.Responses.$200>
  }
  ['/auth/password/reset/']: {
    /**
     * auth_password_reset_create - Calls Django Auth PasswordResetForm save method.
     * 
     * Accepts the following POST parameters: email
     * Returns the success/fail message.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthPasswordResetCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthPasswordResetCreate.Responses.$200>
  }
  ['/auth/password/reset/confirm/']: {
    /**
     * auth_password_reset_confirm_create - Password reset e-mail link is confirmed, therefore
     * this resets the user's password.
     * 
     * Accepts the following POST parameters: token, uid,
     *     new_password1, new_password2
     * Returns the success/fail message.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthPasswordResetConfirmCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthPasswordResetConfirmCreate.Responses.$200>
  }
  ['/auth/registration/']: {
    /**
     * auth_registration_create
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthRegistrationCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthRegistrationCreate.Responses.$201>
  }
  ['/auth/set-csrf/']: {
    /**
     * auth_set_csrf_retrieve
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthSetCsrfRetrieve.Responses.$200>
  }
  ['/auth/user/']: {
    /**
     * auth_user_retrieve - Reads and updates UserModel fields
     * Accepts GET, PUT, PATCH methods.
     * 
     * Default accepted fields: username, first_name, last_name
     * Default display fields: pk, username, email, first_name, last_name
     * Read-only fields: pk, email
     * 
     * Returns UserModel fields.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthUserRetrieve.Responses.$200>
    /**
     * auth_user_update - Reads and updates UserModel fields
     * Accepts GET, PUT, PATCH methods.
     * 
     * Default accepted fields: username, first_name, last_name
     * Default display fields: pk, username, email, first_name, last_name
     * Read-only fields: pk, email
     * 
     * Returns UserModel fields.
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthUserUpdate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthUserUpdate.Responses.$200>
    /**
     * auth_user_partial_update - Reads and updates UserModel fields
     * Accepts GET, PUT, PATCH methods.
     * 
     * Default accepted fields: username, first_name, last_name
     * Default display fields: pk, username, email, first_name, last_name
     * Read-only fields: pk, email
     * 
     * Returns UserModel fields.
     */
    'patch'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthUserPartialUpdate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthUserPartialUpdate.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
