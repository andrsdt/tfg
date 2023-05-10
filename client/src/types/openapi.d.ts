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
    namespace ApiV1AuthLoginCreate {
        export type RequestBody = Components.Schemas.Login;
        namespace Responses {
            export type $200 = /* Serializer for Token model. */ Components.Schemas.Token;
        }
    }
    namespace ApiV1AuthLogoutCreate {
        namespace Responses {
            export type $200 = Components.Schemas.RestAuthDetail;
        }
    }
    namespace ApiV1AuthPasswordChangeCreate {
        export type RequestBody = Components.Schemas.PasswordChange;
        namespace Responses {
            export type $200 = Components.Schemas.RestAuthDetail;
        }
    }
    namespace ApiV1AuthPasswordResetConfirmCreate {
        export type RequestBody = /* Serializer for confirming a password reset attempt. */ Components.Schemas.PasswordResetConfirm;
        namespace Responses {
            export type $200 = Components.Schemas.RestAuthDetail;
        }
    }
    namespace ApiV1AuthPasswordResetCreate {
        export type RequestBody = /* Serializer for requesting a password reset e-mail. */ Components.Schemas.PasswordReset;
        namespace Responses {
            export type $200 = Components.Schemas.RestAuthDetail;
        }
    }
    namespace ApiV1AuthRegistrationCreate {
        export type RequestBody = Components.Schemas.CustomRegister;
        namespace Responses {
            export type $201 = /* Serializer for Token model. */ Components.Schemas.Token;
        }
    }
    namespace ApiV1AuthSetCsrfRetrieve {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace ApiV1AuthUserPartialUpdate {
        export type RequestBody = /* User model w/o password */ Components.Schemas.PatchedUserDetails;
        namespace Responses {
            export type $200 = /* User model w/o password */ Components.Schemas.UserDetails;
        }
    }
    namespace ApiV1AuthUserRetrieve {
        namespace Responses {
            export type $200 = /* User model w/o password */ Components.Schemas.UserDetails;
        }
    }
    namespace ApiV1AuthUserUpdate {
        export type RequestBody = /* User model w/o password */ Components.Schemas.UserDetails;
        namespace Responses {
            export type $200 = /* User model w/o password */ Components.Schemas.UserDetails;
        }
    }
    namespace ApiV1SchemaRetrieve {
        namespace Parameters {
            export type Format = "json" | "yaml";
            export type Lang = "af" | "ar" | "ar-dz" | "ast" | "az" | "be" | "bg" | "bn" | "br" | "bs" | "ca" | "ckb" | "cs" | "cy" | "da" | "de" | "dsb" | "el" | "en" | "en-au" | "en-gb" | "eo" | "es" | "es-ar" | "es-co" | "es-mx" | "es-ni" | "es-ve" | "et" | "eu" | "fa" | "fi" | "fr" | "fy" | "ga" | "gd" | "gl" | "he" | "hi" | "hr" | "hsb" | "hu" | "hy" | "ia" | "id" | "ig" | "io" | "is" | "it" | "ja" | "ka" | "kab" | "kk" | "km" | "kn" | "ko" | "ky" | "lb" | "lt" | "lv" | "mk" | "ml" | "mn" | "mr" | "ms" | "my" | "nb" | "ne" | "nl" | "nn" | "os" | "pa" | "pl" | "pt" | "pt-br" | "ro" | "ru" | "sk" | "sl" | "sq" | "sr" | "sr-latn" | "sv" | "sw" | "ta" | "te" | "tg" | "th" | "tk" | "tr" | "tt" | "udm" | "uk" | "ur" | "uz" | "vi" | "zh-hans" | "zh-hant";
        }
        export interface QueryParameters {
            format?: Parameters.Format;
            lang?: Parameters.Lang;
        }
        namespace Responses {
            export interface $200 {
                [name: string]: any;
            }
        }
    }
}

export interface OperationMethods {
  /**
   * api_v1_auth_login_create - Check the credentials and return the REST Token
   * if the credentials are valid and authenticated.
   * Calls Django Auth login method to register User ID
   * in Django session framework
   * 
   * Accept the following POST parameters: username, password
   * Return the REST Framework Token Object's key.
   */
  'api_v1_auth_login_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ApiV1AuthLoginCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ApiV1AuthLoginCreate.Responses.$200>
  /**
   * api_v1_auth_logout_create - Calls Django logout method and delete the Token object
   * assigned to the current User object.
   * 
   * Accepts/Returns nothing.
   */
  'api_v1_auth_logout_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ApiV1AuthLogoutCreate.Responses.$200>
  /**
   * api_v1_auth_password_change_create - Calls Django Auth SetPasswordForm save method.
   * 
   * Accepts the following POST parameters: new_password1, new_password2
   * Returns the success/fail message.
   */
  'api_v1_auth_password_change_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ApiV1AuthPasswordChangeCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ApiV1AuthPasswordChangeCreate.Responses.$200>
  /**
   * api_v1_auth_password_reset_create - Calls Django Auth PasswordResetForm save method.
   * 
   * Accepts the following POST parameters: email
   * Returns the success/fail message.
   */
  'api_v1_auth_password_reset_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ApiV1AuthPasswordResetCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ApiV1AuthPasswordResetCreate.Responses.$200>
  /**
   * api_v1_auth_password_reset_confirm_create - Password reset e-mail link is confirmed, therefore
   * this resets the user's password.
   * 
   * Accepts the following POST parameters: token, uid,
   *     new_password1, new_password2
   * Returns the success/fail message.
   */
  'api_v1_auth_password_reset_confirm_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ApiV1AuthPasswordResetConfirmCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ApiV1AuthPasswordResetConfirmCreate.Responses.$200>
  /**
   * api_v1_auth_registration_create
   */
  'api_v1_auth_registration_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ApiV1AuthRegistrationCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ApiV1AuthRegistrationCreate.Responses.$201>
  /**
   * api_v1_auth_set_csrf_retrieve
   */
  'api_v1_auth_set_csrf_retrieve'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ApiV1AuthSetCsrfRetrieve.Responses.$200>
  /**
   * api_v1_auth_user_retrieve - Reads and updates UserModel fields
   * Accepts GET, PUT, PATCH methods.
   * 
   * Default accepted fields: username, first_name, last_name
   * Default display fields: pk, username, email, first_name, last_name
   * Read-only fields: pk, email
   * 
   * Returns UserModel fields.
   */
  'api_v1_auth_user_retrieve'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ApiV1AuthUserRetrieve.Responses.$200>
  /**
   * api_v1_auth_user_update - Reads and updates UserModel fields
   * Accepts GET, PUT, PATCH methods.
   * 
   * Default accepted fields: username, first_name, last_name
   * Default display fields: pk, username, email, first_name, last_name
   * Read-only fields: pk, email
   * 
   * Returns UserModel fields.
   */
  'api_v1_auth_user_update'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ApiV1AuthUserUpdate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ApiV1AuthUserUpdate.Responses.$200>
  /**
   * api_v1_auth_user_partial_update - Reads and updates UserModel fields
   * Accepts GET, PUT, PATCH methods.
   * 
   * Default accepted fields: username, first_name, last_name
   * Default display fields: pk, username, email, first_name, last_name
   * Read-only fields: pk, email
   * 
   * Returns UserModel fields.
   */
  'api_v1_auth_user_partial_update'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ApiV1AuthUserPartialUpdate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ApiV1AuthUserPartialUpdate.Responses.$200>
  /**
   * api_v1_schema_retrieve - OpenApi3 schema for this API. Format can be selected via content negotiation.
   * 
   * - YAML: application/vnd.oai.openapi
   * - JSON: application/vnd.oai.openapi+json
   */
  'api_v1_schema_retrieve'(
    parameters?: Parameters<Paths.ApiV1SchemaRetrieve.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ApiV1SchemaRetrieve.Responses.$200>
}

export interface PathsDictionary {
  ['/api/v1/auth/login/']: {
    /**
     * api_v1_auth_login_create - Check the credentials and return the REST Token
     * if the credentials are valid and authenticated.
     * Calls Django Auth login method to register User ID
     * in Django session framework
     * 
     * Accept the following POST parameters: username, password
     * Return the REST Framework Token Object's key.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ApiV1AuthLoginCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ApiV1AuthLoginCreate.Responses.$200>
  }
  ['/api/v1/auth/logout/']: {
    /**
     * api_v1_auth_logout_create - Calls Django logout method and delete the Token object
     * assigned to the current User object.
     * 
     * Accepts/Returns nothing.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ApiV1AuthLogoutCreate.Responses.$200>
  }
  ['/api/v1/auth/password/change/']: {
    /**
     * api_v1_auth_password_change_create - Calls Django Auth SetPasswordForm save method.
     * 
     * Accepts the following POST parameters: new_password1, new_password2
     * Returns the success/fail message.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ApiV1AuthPasswordChangeCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ApiV1AuthPasswordChangeCreate.Responses.$200>
  }
  ['/api/v1/auth/password/reset/']: {
    /**
     * api_v1_auth_password_reset_create - Calls Django Auth PasswordResetForm save method.
     * 
     * Accepts the following POST parameters: email
     * Returns the success/fail message.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ApiV1AuthPasswordResetCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ApiV1AuthPasswordResetCreate.Responses.$200>
  }
  ['/api/v1/auth/password/reset/confirm/']: {
    /**
     * api_v1_auth_password_reset_confirm_create - Password reset e-mail link is confirmed, therefore
     * this resets the user's password.
     * 
     * Accepts the following POST parameters: token, uid,
     *     new_password1, new_password2
     * Returns the success/fail message.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ApiV1AuthPasswordResetConfirmCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ApiV1AuthPasswordResetConfirmCreate.Responses.$200>
  }
  ['/api/v1/auth/registration/']: {
    /**
     * api_v1_auth_registration_create
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ApiV1AuthRegistrationCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ApiV1AuthRegistrationCreate.Responses.$201>
  }
  ['/api/v1/auth/set-csrf/']: {
    /**
     * api_v1_auth_set_csrf_retrieve
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ApiV1AuthSetCsrfRetrieve.Responses.$200>
  }
  ['/api/v1/auth/user/']: {
    /**
     * api_v1_auth_user_retrieve - Reads and updates UserModel fields
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
    ): OperationResponse<Paths.ApiV1AuthUserRetrieve.Responses.$200>
    /**
     * api_v1_auth_user_update - Reads and updates UserModel fields
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
      data?: Paths.ApiV1AuthUserUpdate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ApiV1AuthUserUpdate.Responses.$200>
    /**
     * api_v1_auth_user_partial_update - Reads and updates UserModel fields
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
      data?: Paths.ApiV1AuthUserPartialUpdate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ApiV1AuthUserPartialUpdate.Responses.$200>
  }
  ['/api/v1/schema/']: {
    /**
     * api_v1_schema_retrieve - OpenApi3 schema for this API. Format can be selected via content negotiation.
     * 
     * - YAML: application/vnd.oai.openapi
     * - JSON: application/vnd.oai.openapi+json
     */
    'get'(
      parameters?: Parameters<Paths.ApiV1SchemaRetrieve.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ApiV1SchemaRetrieve.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
