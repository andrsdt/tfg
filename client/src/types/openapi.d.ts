import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios'; 

declare namespace Components {
    namespace Schemas {
        /**
         * * `LACTOSE` - lactose
         * * `WHEAT` - wheat
         * * `NUTS` - nuts
         * * `CELERY` - celery
         * * `CRUSTACEANS` - crustaceans
         * * `EGG` - egg
         * * `FISH` - fish
         * * `GLUTEN` - gluten
         * * `LUPINS` - lupins
         * * `MILK` - milk
         * * `MOLLUSKS` - mollusks
         * * `MUSTARD` - mustard
         * * `PEANUTS` - peanuts
         * * `SESAME` - sesame
         * * `SOYBEANS` - soybeans
         * * `SULPHITES` - sulphites
         */
        export type AllergenEnum = "LACTOSE" | "WHEAT" | "NUTS" | "CELERY" | "CRUSTACEANS" | "EGG" | "FISH" | "GLUTEN" | "LUPINS" | "MILK" | "MOLLUSKS" | "MUSTARD" | "PEANUTS" | "SESAME" | "SOYBEANS" | "SULPHITES";
        export interface Count {
            count: number;
        }
        export interface CustomLoginRequest {
            email: string; // email
            password: string;
        }
        export interface CustomRegisterRequest {
            email: string; // email
            password1: string;
            password2: string;
            first_name: string;
            last_name: string;
        }
        /**
         * User model w/o password
         */
        export interface CustomUserDetails {
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
            is_producer: boolean;
            has_completed_onboarding: boolean;
            photo: string; // uri
            phone?: string | null;
            location?: {
                type?: "Point";
                /**
                 * example:
                 * [
                 *   12.9721,
                 *   77.5933
                 * ]
                 */
                coordinates?: [
                    number,
                    number,
                    number?
                ];
            } | null;
            created_at: string; // date-time
        }
        /**
         * User model w/o password
         */
        export interface CustomUserDetailsRequest {
            first_name?: string;
            last_name?: string;
            photo: string; // binary
            phone?: string | null;
            location?: {
                type?: "Point";
                /**
                 * example:
                 * [
                 *   12.9721,
                 *   77.5933
                 * ]
                 */
                coordinates?: [
                    number,
                    number,
                    number?
                ];
            } | null;
        }
        /**
         * * `ALLOWS_DELIVERY` - allows_delivery
         * * `ALLOWS_PICKUP` - allows_pickup
         * * `IS_FROZEN` - is_frozen
         * * `IS_VEGAN` - is_vegan
         * * `IS_SUGAR_FREE` - is_sugar_free
         */
        export type FeatureEnum = "ALLOWS_DELIVERY" | "ALLOWS_PICKUP" | "IS_FROZEN" | "IS_VEGAN" | "IS_SUGAR_FREE";
        export interface Listing {
            id: number;
            allergens: ProductAllergen[];
            features: ProductFeature[];
            images: ListingImage[];
            producer: {
                user: {
                    id: number;
                    first_name?: string;
                    last_name?: string;
                    photo?: string | null; // uri
                    phone?: string | null;
                    location?: {
                        type?: "Point";
                        /**
                         * example:
                         * [
                         *   12.9721,
                         *   77.5933
                         * ]
                         */
                        coordinates?: [
                            number,
                            number,
                            number?
                        ];
                    } | null;
                    created_at: string; // date-time
                };
                biography?: string | null;
            };
            is_favorite: boolean;
            created_at: string; // date-time
            updated_at: string; // date-time
            title: string;
            description?: string | null;
            unit: /**
             * * `KG` - kilogram
             * * `UNIT` - unitary
             */
            UnitEnum;
            price_per_unit: number;
            g_per_unit?: null | number;
            available_quantity: number;
        }
        export interface ListingCreate {
            id: number;
            title: string;
            description: string | null;
            images: ListingImage[];
            unit: /**
             * * `KG` - kilogram
             * * `UNIT` - unitary
             */
            UnitEnum;
            price_per_unit: number;
            g_per_unit: number;
            available_quantity: number;
            allergens?: ProductAllergen[];
            features?: ProductFeature[];
            created_at: string; // date-time
            updated_at: string; // date-time
        }
        export interface ListingCreateRequest {
            title: string;
            description: string | null;
            images: ListingImageRequest[];
            unit: /**
             * * `KG` - kilogram
             * * `UNIT` - unitary
             */
            UnitEnum;
            price_per_unit: number;
            g_per_unit: number;
            available_quantity: number;
            allergens?: ProductAllergenRequest[];
            features?: ProductFeatureRequest[];
        }
        export interface ListingImage {
            image: string; // uri
        }
        export interface ListingImageRequest {
            image: string; // binary
        }
        export interface ListingRequest {
            title: string;
            description?: string | null;
            unit: /**
             * * `KG` - kilogram
             * * `UNIT` - unitary
             */
            UnitEnum;
            price_per_unit: number;
            g_per_unit?: null | number;
            available_quantity: number;
        }
        export interface Notification {
            id: number;
            created_at: string; // date-time
            updated_at: string; // date-time
            notification_type: /**
             * * `CHAT_MESSAGE` - CHAT_MESSAGE
             * * `NEW_LISTING` - NEW_LISTING
             * * `NEW_REVIEW` - NEW_REVIEW
             * * `NEW_LIKE` - NEW_LIKE
             * * `REMINDER_REVIEW` - REMINDER_REVIEW
             * * `REMINDER_COMPLETE_PROFILE` - REMINDER_COMPLETE_PROFILE
             * * `REPORT_CONFIRMATION` - REPORT_CONFIRMATION
             */
            NotificationTypeEnum;
            data: {
                [name: string]: any;
            };
            is_read?: boolean;
            receiver: number;
        }
        /**
         * * `CHAT_MESSAGE` - CHAT_MESSAGE
         * * `NEW_LISTING` - NEW_LISTING
         * * `NEW_REVIEW` - NEW_REVIEW
         * * `NEW_LIKE` - NEW_LIKE
         * * `REMINDER_REVIEW` - REMINDER_REVIEW
         * * `REMINDER_COMPLETE_PROFILE` - REMINDER_COMPLETE_PROFILE
         * * `REPORT_CONFIRMATION` - REPORT_CONFIRMATION
         */
        export type NotificationTypeEnum = "CHAT_MESSAGE" | "NEW_LISTING" | "NEW_REVIEW" | "NEW_LIKE" | "REMINDER_REVIEW" | "REMINDER_COMPLETE_PROFILE" | "REPORT_CONFIRMATION";
        export interface PasswordChangeRequest {
            new_password1: string;
            new_password2: string;
        }
        /**
         * Serializer for confirming a password reset attempt.
         */
        export interface PasswordResetConfirmRequest {
            new_password1: string;
            new_password2: string;
            uid: string;
            token: string;
        }
        /**
         * Serializer for requesting a password reset e-mail.
         */
        export interface PasswordResetRequest {
            email: string; // email
        }
        /**
         * User model w/o password
         */
        export interface PatchedCustomUserDetailsRequest {
            first_name?: string;
            last_name?: string;
            photo?: string; // binary
            phone?: string | null;
            location?: {
                type?: "Point";
                /**
                 * example:
                 * [
                 *   12.9721,
                 *   77.5933
                 * ]
                 */
                coordinates?: [
                    number,
                    number,
                    number?
                ];
            } | null;
        }
        export interface PatchedListingCreateRequest {
            title?: string;
            description?: string | null;
            images?: ListingImageRequest[];
            unit?: /**
             * * `KG` - kilogram
             * * `UNIT` - unitary
             */
            UnitEnum;
            price_per_unit?: number;
            g_per_unit?: number;
            available_quantity?: number;
            allergens?: ProductAllergenRequest[];
            features?: ProductFeatureRequest[];
        }
        export interface Producer {
            user: {
                id: number;
                first_name?: string;
                last_name?: string;
                photo?: string | null; // uri
                phone?: string | null;
                location?: {
                    type?: "Point";
                    /**
                     * example:
                     * [
                     *   12.9721,
                     *   77.5933
                     * ]
                     */
                    coordinates?: [
                        number,
                        number,
                        number?
                    ];
                } | null;
                created_at: string; // date-time
            };
            biography?: string | null;
        }
        export interface ProducerRequest {
            biography?: string | null;
        }
        export interface ProductAllergen {
            allergen: /**
             * * `LACTOSE` - lactose
             * * `WHEAT` - wheat
             * * `NUTS` - nuts
             * * `CELERY` - celery
             * * `CRUSTACEANS` - crustaceans
             * * `EGG` - egg
             * * `FISH` - fish
             * * `GLUTEN` - gluten
             * * `LUPINS` - lupins
             * * `MILK` - milk
             * * `MOLLUSKS` - mollusks
             * * `MUSTARD` - mustard
             * * `PEANUTS` - peanuts
             * * `SESAME` - sesame
             * * `SOYBEANS` - soybeans
             * * `SULPHITES` - sulphites
             */
            AllergenEnum;
        }
        export interface ProductAllergenRequest {
            allergen: /**
             * * `LACTOSE` - lactose
             * * `WHEAT` - wheat
             * * `NUTS` - nuts
             * * `CELERY` - celery
             * * `CRUSTACEANS` - crustaceans
             * * `EGG` - egg
             * * `FISH` - fish
             * * `GLUTEN` - gluten
             * * `LUPINS` - lupins
             * * `MILK` - milk
             * * `MOLLUSKS` - mollusks
             * * `MUSTARD` - mustard
             * * `PEANUTS` - peanuts
             * * `SESAME` - sesame
             * * `SOYBEANS` - soybeans
             * * `SULPHITES` - sulphites
             */
            AllergenEnum;
        }
        export interface ProductFeature {
            feature: /**
             * * `ALLOWS_DELIVERY` - allows_delivery
             * * `ALLOWS_PICKUP` - allows_pickup
             * * `IS_FROZEN` - is_frozen
             * * `IS_VEGAN` - is_vegan
             * * `IS_SUGAR_FREE` - is_sugar_free
             */
            FeatureEnum;
        }
        export interface ProductFeatureRequest {
            feature: /**
             * * `ALLOWS_DELIVERY` - allows_delivery
             * * `ALLOWS_PICKUP` - allows_pickup
             * * `IS_FROZEN` - is_frozen
             * * `IS_VEGAN` - is_vegan
             * * `IS_SUGAR_FREE` - is_sugar_free
             */
            FeatureEnum;
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
         * * `KG` - kilogram
         * * `UNIT` - unitary
         */
        export type UnitEnum = "KG" | "UNIT";
        export interface User {
            id: number;
            first_name?: string;
            last_name?: string;
            photo?: string | null; // uri
            phone?: string | null;
            location?: {
                type?: "Point";
                /**
                 * example:
                 * [
                 *   12.9721,
                 *   77.5933
                 * ]
                 */
                coordinates?: [
                    number,
                    number,
                    number?
                ];
            } | null;
            created_at: string; // date-time
        }
        export interface UserRequest {
            first_name?: string;
            last_name?: string;
            photo?: string | null; // binary
            phone?: string | null;
            location?: {
                type?: "Point";
                /**
                 * example:
                 * [
                 *   12.9721,
                 *   77.5933
                 * ]
                 */
                coordinates?: [
                    number,
                    number,
                    number?
                ];
            } | null;
        }
    }
}
declare namespace Paths {
    namespace AuthLoginCreate {
        export type RequestBody = Components.Schemas.CustomLoginRequest;
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
        export type RequestBody = Components.Schemas.PasswordChangeRequest;
        namespace Responses {
            export type $200 = Components.Schemas.RestAuthDetail;
        }
    }
    namespace AuthPasswordResetConfirmCreate {
        export type RequestBody = /* Serializer for confirming a password reset attempt. */ Components.Schemas.PasswordResetConfirmRequest;
        namespace Responses {
            export type $200 = Components.Schemas.RestAuthDetail;
        }
    }
    namespace AuthPasswordResetCreate {
        export type RequestBody = /* Serializer for requesting a password reset e-mail. */ Components.Schemas.PasswordResetRequest;
        namespace Responses {
            export type $200 = Components.Schemas.RestAuthDetail;
        }
    }
    namespace AuthRegistrationCreate {
        export type RequestBody = Components.Schemas.CustomRegisterRequest;
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
        export type RequestBody = /* User model w/o password */ Components.Schemas.PatchedCustomUserDetailsRequest;
        namespace Responses {
            export type $200 = /* User model w/o password */ Components.Schemas.CustomUserDetails;
        }
    }
    namespace AuthUserRetrieve {
        namespace Responses {
            export type $200 = /* User model w/o password */ Components.Schemas.CustomUserDetails;
        }
    }
    namespace AuthUserUpdate {
        export type RequestBody = /* User model w/o password */ Components.Schemas.CustomUserDetailsRequest;
        namespace Responses {
            export type $200 = /* User model w/o password */ Components.Schemas.CustomUserDetails;
        }
    }
    namespace ListingsCreate {
        export type RequestBody = Components.Schemas.ListingCreateRequest;
        namespace Responses {
            export type $201 = Components.Schemas.ListingCreate;
        }
    }
    namespace ListingsDestroy {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace ListingsDislikeCreate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.ListingRequest;
        namespace Responses {
            export type $200 = Components.Schemas.Listing;
        }
    }
    namespace ListingsLikeCreate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.ListingRequest;
        namespace Responses {
            export type $200 = Components.Schemas.Listing;
        }
    }
    namespace ListingsList {
        namespace Parameters {
            export type Allergens = string;
            export type AvailableQuantityMax = number;
            export type AvailableQuantityMin = number;
            export type Distance = string;
            export type DistanceOrder = string;
            export type Favorite = boolean;
            export type Features = string;
            export type OrderBy = ("-created_at" | "-price" | "-quantity" | "-updated_at" | "created_at" | "price" | "quantity" | "updated_at")[];
            export type PriceMax = number;
            export type PriceMin = number;
            export type Producer = string;
            export type Title = string;
            export type Unit = string;
        }
        export interface QueryParameters {
            allergens?: Parameters.Allergens;
            available_quantity_max?: Parameters.AvailableQuantityMax;
            available_quantity_min?: Parameters.AvailableQuantityMin;
            distance?: Parameters.Distance;
            distance_order?: Parameters.DistanceOrder;
            favorite?: Parameters.Favorite;
            features?: Parameters.Features;
            order_by?: Parameters.OrderBy;
            price_max?: Parameters.PriceMax;
            price_min?: Parameters.PriceMin;
            producer?: Parameters.Producer;
            title?: Parameters.Title;
            unit?: Parameters.Unit;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Listing[];
        }
    }
    namespace ListingsPartialUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.PatchedListingCreateRequest;
        namespace Responses {
            export type $200 = Components.Schemas.ListingCreate;
        }
    }
    namespace ListingsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Listing;
        }
    }
    namespace ListingsUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.ListingCreateRequest;
        namespace Responses {
            export type $200 = Components.Schemas.ListingCreate;
        }
    }
    namespace NotificationsCountRetrieve {
        namespace Responses {
            export type $200 = Components.Schemas.Count;
        }
    }
    namespace NotificationsList {
        namespace Responses {
            export type $200 = Components.Schemas.Notification[];
        }
    }
    namespace ProducersCreate {
        namespace Responses {
            export interface $201 {
            }
        }
    }
    namespace ProducersRetrieve {
        namespace Parameters {
            export type User = number;
        }
        export interface PathParameters {
            user: Parameters.User;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Producer;
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
  /**
   * listings_list
   */
  'listings_list'(
    parameters?: Parameters<Paths.ListingsList.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListingsList.Responses.$200>
  /**
   * listings_create
   */
  'listings_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ListingsCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListingsCreate.Responses.$201>
  /**
   * listings_retrieve
   */
  'listings_retrieve'(
    parameters?: Parameters<Paths.ListingsRetrieve.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListingsRetrieve.Responses.$200>
  /**
   * listings_update
   */
  'listings_update'(
    parameters?: Parameters<Paths.ListingsUpdate.PathParameters> | null,
    data?: Paths.ListingsUpdate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListingsUpdate.Responses.$200>
  /**
   * listings_partial_update
   */
  'listings_partial_update'(
    parameters?: Parameters<Paths.ListingsPartialUpdate.PathParameters> | null,
    data?: Paths.ListingsPartialUpdate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListingsPartialUpdate.Responses.$200>
  /**
   * listings_destroy
   */
  'listings_destroy'(
    parameters?: Parameters<Paths.ListingsDestroy.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListingsDestroy.Responses.$204>
  /**
   * listings_dislike_create
   */
  'listings_dislike_create'(
    parameters?: Parameters<Paths.ListingsDislikeCreate.PathParameters> | null,
    data?: Paths.ListingsDislikeCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListingsDislikeCreate.Responses.$200>
  /**
   * listings_like_create
   */
  'listings_like_create'(
    parameters?: Parameters<Paths.ListingsLikeCreate.PathParameters> | null,
    data?: Paths.ListingsLikeCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListingsLikeCreate.Responses.$200>
  /**
   * notifications_list
   */
  'notifications_list'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NotificationsList.Responses.$200>
  /**
   * notifications_count_retrieve
   */
  'notifications_count_retrieve'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NotificationsCountRetrieve.Responses.$200>
  /**
   * producers_create
   */
  'producers_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ProducersCreate.Responses.$201>
  /**
   * producers_retrieve
   */
  'producers_retrieve'(
    parameters?: Parameters<Paths.ProducersRetrieve.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ProducersRetrieve.Responses.$200>
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
  ['/listings/']: {
    /**
     * listings_list
     */
    'get'(
      parameters?: Parameters<Paths.ListingsList.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListingsList.Responses.$200>
    /**
     * listings_create
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ListingsCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListingsCreate.Responses.$201>
  }
  ['/listings/{id}/']: {
    /**
     * listings_retrieve
     */
    'get'(
      parameters?: Parameters<Paths.ListingsRetrieve.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListingsRetrieve.Responses.$200>
    /**
     * listings_update
     */
    'put'(
      parameters?: Parameters<Paths.ListingsUpdate.PathParameters> | null,
      data?: Paths.ListingsUpdate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListingsUpdate.Responses.$200>
    /**
     * listings_partial_update
     */
    'patch'(
      parameters?: Parameters<Paths.ListingsPartialUpdate.PathParameters> | null,
      data?: Paths.ListingsPartialUpdate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListingsPartialUpdate.Responses.$200>
    /**
     * listings_destroy
     */
    'delete'(
      parameters?: Parameters<Paths.ListingsDestroy.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListingsDestroy.Responses.$204>
  }
  ['/listings/{id}/dislike/']: {
    /**
     * listings_dislike_create
     */
    'post'(
      parameters?: Parameters<Paths.ListingsDislikeCreate.PathParameters> | null,
      data?: Paths.ListingsDislikeCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListingsDislikeCreate.Responses.$200>
  }
  ['/listings/{id}/like/']: {
    /**
     * listings_like_create
     */
    'post'(
      parameters?: Parameters<Paths.ListingsLikeCreate.PathParameters> | null,
      data?: Paths.ListingsLikeCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListingsLikeCreate.Responses.$200>
  }
  ['/notifications/']: {
    /**
     * notifications_list
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NotificationsList.Responses.$200>
  }
  ['/notifications/count/']: {
    /**
     * notifications_count_retrieve
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NotificationsCountRetrieve.Responses.$200>
  }
  ['/producers/']: {
    /**
     * producers_create
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ProducersCreate.Responses.$201>
  }
  ['/producers/{user}/']: {
    /**
     * producers_retrieve
     */
    'get'(
      parameters?: Parameters<Paths.ProducersRetrieve.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ProducersRetrieve.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
