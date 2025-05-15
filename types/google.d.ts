export { };

declare global {
  interface Window {
    google: typeof google;
  }
  interface GoogleSignInResponse {
    credential: string;
  }
  interface GoogleSignInError {
    error: string;
  }
  namespace google.accounts.id {
    interface CredentialResponse {
      credential: string;
      select_by: string;
    }

    interface IdConfiguration {
      client_id: string;
      callback: (response: CredentialResponse) => void;
      auto_select?: boolean;
      ux_mode?: 'popup' | 'redirect';
      login_uri?: string;
      native_callback?: (response: CredentialResponse) => void;
      context?: 'signin' | 'signup' | 'use';
      itp_support?: boolean;
      use_fedcm_for_prompt?: boolean;
    }
  }

}
