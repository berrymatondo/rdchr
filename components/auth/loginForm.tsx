import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { getSession, login, logout } from "@/lib/auth";
import { redirect } from "next/navigation";

const LoginForm = async () => {
  const session = await getSession();
  return (
    <div className="bg-white">
      LoginForm
      <form
        /*         action={async (formData) => {
          "use server";
          await login(formData);
          // redirect("/");
        }} */
        action={login}
      >
        <Input name="email" type="email" placeholder="Email" />
        <br />
        <Button type="submit">Login</Button>
      </form>
      <form
        /*         action={async () => {
          "use server";
          await logout();
          redirect("/");
        }} */
        action={logout}
      >
        <Button type="submit">Logout</Button>
      </form>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

export default LoginForm;
