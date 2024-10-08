import { AuthViewType } from '@/lib/auth'
import { Auth } from '@supabase/auth-ui-react'
import {
  ThemeSupa
} from '@supabase/auth-ui-shared'
import { SupabaseClient } from '@supabase/supabase-js'

function AuthForm({ supabase, view = 'sign_in' }: { supabase: SupabaseClient, view: AuthViewType }) {
  return (
    <div className="mx-auto flex flex-1 w-full justify-center items-center flex-col">
      <h1 className="text-4xl font-bold mt-8 mb-4">
        Sign in
      </h1>
      <div className="md:w-[420px] w-[240px]">
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'rgb(255, 136, 0)',
                  brandAccent: 'rgb(255, 136, 0)',
                  inputText: '#FFF',
                },
                radii: {
                  borderRadiusButton: '20px',
                  inputBorderRadius: '12px'
                }
              },
            },
          }}
          localization={{
            variables: {
              sign_in: {
                email_label: 'Email',
                password_label: 'Password',
              },
            },
          }}
          view={view}
          theme='default'
          showLinks={true}
          providers={['google', 'github']}
          providerScopes={{
            github: 'email',
            google: 'email'
          }}
        />
      </div>
    </div>
  )
}

export default AuthForm
