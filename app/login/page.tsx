"use client";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  PaperProps,
  Button,
  Loader,
  NumberInput, // Change Autocomplete to NumberInput
} from "@mantine/core";
import { useEffect, useState } from "react";
import { getDistributers, login, me } from "../actions/actions";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [distributors, setDistributors] = useState<
    { dist_code: number }[]
  >([]); // Updated the state to store only dist_code
  const [errCredentials, setErrCredentials] = useState(false);
  const [loader, setLoader] = useState(false);

  const form = useForm({
    initialValues: {
      dist_code: 0,
      password: "",
      username: "",
    }, // Removed "distributer" from initialValues

    validate: {
      username: (val) => (val.length > 2 ? null : "Invalid Username"),
      password: (val) =>
        val.length <= 2
          ? "Password should include at least 2 characters"
          : null,
    },
  });

  // when the page loads if already logged in send to home page
  useEffect(() => {
    me().then((result) => {
      if (result.success && result.user) router.push("/");
    });
  }, []);

  const handleLogin = async (loginFormData: {
    dist_code: number;
    password: string;
    username: string;
  }) => {
    const credentials = {
      username: loginFormData.username,
      password: loginFormData.password,
      dist_code: loginFormData.dist_code,
    };
    setLoader(true);
    login(credentials)
      .then((result) => {
        if (result.success) {
          router.push("/");
          setLoader(false);
        } else {
          setErrCredentials(true); // Set err to true when login fails
          setLoader(false);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setErrCredentials(true); // Make sure to handle errors and set loader to false if an error occurs.
        setLoader(false);
      });
  };

  useEffect(() => {
    getDistributers().then((eDistributors) => {
      setDistributors(eDistributors.map((e) => ({ dist_code: e.dist_code })));
    });
  }, []);

  return (
    <div className="m-2 grid justify-center   ">
      <div className="w-full h-36 "></div>
      <Paper shadow="xl" radius="lg" p="lg" className="lg:w-80 sm:w-full "  withBorder>
        <Text size="lg" weight={500}>
          Ebook Login
        </Text>
        <div className="w-full h-8"></div>
        <form onSubmit={form.onSubmit((values) => handleLogin(values))}
       >
          <NumberInput
            required
            label="Distributor Code" // Updated label
            min={0}
            placeholder="Distributor Code"
            value={form.values.dist_code || 0} // Ensure the value is always a number
            onChange={(value) => {
              form.setFieldValue("dist_code", Number(value)); // Convert the value to a number
            }}
            radius="md"
          />
          <div className="w-full h-4"></div>
          <TextInput
            required
            label="Username"
            placeholder="Username"
            value={form.values.username}
            onChange={(event) =>
              form.setFieldValue("username", event.currentTarget.value)
            }
            radius="md"
          />
          <div className="w-full h-4"></div>
          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event: any) => {
              form.setFieldValue("password", event.currentTarget.value);
            }}
            error={
              form.errors.password &&
              "Password should include at least 2 characters"
            }
            radius="md"
          />
          {errCredentials && (
            <div className="text-red-500">
              Login failed. Please check your credentials.
            </div>
          )}

          <div className="w-full m-4 ">
           
          </div>
          <Button
            type="submit"
            variant="primary"
            className="bg-black text-white mb-2"
          >
            Login
          </Button>
         

          
        </form>
      {loader && <Loader className="absolute justify-center align-center w-full h-full" color="dark" variant="dots"></Loader>}
      </Paper>
    </div>
  );
}
