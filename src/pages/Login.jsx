import { AuthLayout } from "../components/AuthLayout";
import { Button } from "../components/Button";
import { TextField } from "../components/Fields";
import Logo from "../assets/paf.png";

export const metadata = {
  title: "Sign In",
};

export default function Login() {
  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle={
        <>
          Don’t have an account?{" "}
          <a href="/register" className="text-cyan-600">
            Sign up
          </a>
          for a free trial.
        </>
      }
    >
      <form>
        <div className="space-y-6">
          <TextField
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>
        <Button
          type="submit"
          className="mt-8 w-full bg-primary hover:bg-primary/80"
        >
          Sign in to account
        </Button>
      </form>
    </AuthLayout>
  );
}
