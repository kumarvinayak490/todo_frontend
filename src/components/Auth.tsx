/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { login, register } from "../apis/auth";
import classNames from "classnames";
import { toast } from "react-toastify";
import { useRouter } from "next/router";


export const AuthComponent = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const navigate = useRouter();
  const [errors, setErrors] = useState<Array<string>>([]);

  const additionalFields = useMemo(() => {
    if (isNewUser) return ["new user"];
    return [];
  }, [isNewUser]);

  const title = isNewUser ? "Register your account" : "Sign in to your account";

  const buttonTitle = isNewUser ? "Sign up" : "Sign in";
  const footerTitle = isNewUser
    ? "Already have an account?"
    : "Dont't have an account yet?";

  const footerButtonTitle = isNewUser ? "Sign in" : "Sign up";

  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          {title}
        </h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const target = e.target as HTMLFormElement;
            const email = (target.email as HTMLInputElement).value;
            const password = (target.password as HTMLInputElement).value;
            if (!email || !password) return;
            try {
              if (!isNewUser) {
                const res = await login<{ data:{token: string} }>({
                  email,
                  password,
                });
                localStorage.setItem("token", JSON.stringify(res.data.token));
                navigate.push("/todos");
              } else {
                await register({
                  email,
                  password,
                });
                (target.email as HTMLInputElement).value = "";
                (target.password as HTMLInputElement).value = "";
                toast.success("User Created Successfully, Please login");
                setIsNewUser(false);
              }
            } catch (err: any) {
              console.log(err)
              // if (
              //   err?.response?.data &&
              //   typeof err?.response?.data === "object"
              // )
              //   setErrors(Object.keys(err.response.data));
              //   Object.keys(err.response.data).forEach((value) => {
              //   toast.error(err.response.data[value][0]);
              // });
            }
          }}
          className="space-y-4 md:space-y-6"
          action="#"
        >
         
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="sample@gmail.com"
            />
            <span
              className={classNames(
                "pt-1 text-xs font-semibold text-gray-100 transition-all duration-200 ease-in-out",
                errors.includes("email")
                  ? "opacity-100 block "
                  : "opacity-0 hidden"
              )}
            >
              Email Error
            </span>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              required
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <span
              className={classNames(
                "pt-1 text-xs font-semibold text-gray-100 transition-all duration-200 ease-in-out",
                errors.includes("password")
                  ? "opacity-100 block "
                  : "opacity-0 hidden"
              )}
            >
              Password Error
            </span>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            {buttonTitle}
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400 transition-all">
            {footerTitle}
            <button
              type="button"
              onClick={() => {
                setIsNewUser((prev) => !prev);
              }}
              className="font-medium text-primary-600 hover:underline dark:text-primary-500 px-1"
            >
              {footerButtonTitle}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthComponent;
