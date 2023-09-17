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
  Autocomplete,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { getDistributers, login, me } from "../actions/actions";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [distributors, setDistributors] = useState<
  { ID: number; dist_code: number; name: string }[]
  >([]);
  const [distributorMap, setDistributorMap] = useState({});
  const [errCredentials, setErrCredentials] = useState(false);
  const [loader, setLoader] = useState(false);

  const form = useForm({
    initialValues: {
      dist_code: 0,
      password: "",
      username: "",
      distributer: "",
    },

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
    distributer: string;
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
      setDistributors(eDistributors);
      for (let d of eDistributors) {
        setDistributorMap({ ...distributorMap, [d.name]: d.dist_code });
      }
    });
  }, []);

  return (
    <div className="m-4">
      <div className="w-full h-36"></div>
      <Paper shadow="xl" radius="lg" p="xs" withBorder>
        <Text size="lg" weight={500}>
          Ebook Login
        </Text>
        <div className="w-full h-8"></div>
        <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
          <Autocomplete
            required
            label="Distributer"
            placeholder="distributer"
            value={form.values.distributer}
            data={distributors.map((e) => e.name)}
            onChange={(value) => {
              form.setFieldValue("distributer", value);
              form.setFieldValue(
                "dist_code",
                distributors.find((e) => e.name === value)?.dist_code as any
              );
            }}
            radius="md"
          />
          <div className="w-full h-4"></div>
          <TextInput
            required
            label="Username"
            placeholder="username"
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

          <div className="w-full h-8">
            {loader && <Loader color="dark" variant="dots"></Loader>}
          </div>
          <Button
            type="submit"
            variant="primary"
            className="bg-black text-white mb-2"
          >
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
}
