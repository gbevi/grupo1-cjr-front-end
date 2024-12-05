"use client";
import Image from "next/image";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Formik, Field, Form, ErrorMessage } from "formik";

export default function Login() {
  const router = useRouter();

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
    password: Yup.string().required("Campo obrigatório"),
  });

  const handleSubmit = async (values: { email: string; password: string; departamento: string; curso: string }) => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email: values.email,
        password: values.password, 
        departamento: values.departamento,
        curso: values.curso,
      });

      const token = response.data.access_token;

      localStorage.setItem("token", token);
      console.log(response.data);
      alert("Login realizado com sucesso!");
      router.push("/Feed");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Erro na solicitação Axios:", error.response?.data || error.message);
        console.error("Status HTTP:", error.response?.status);
      } else {
        console.error("Erro desconhecido:", error);
      }
      alert("Falha no login. Verifique suas credenciais.");
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200">
          <h1 className="text-5xl font-Inter semibold">Avaliação de Professores</h1>
          <p className="font-medium font-Inter text-lg text-gray-500 mt-4">
            Cadastre seus Dados:
          </p>

          <Formik
            initialValues={{ email: "", password: "", departamento: "", curso: "" }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            <Form className="mt-8">
              <div>
                <label className="text-lg font-medium font-Inter">Email</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Digite seu Email"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="text-lg font-medium font-Inter">Senha</label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Digite sua senha"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-lg font-medium font-Inter">Departamento</label>
                <Field
                  name="departamento"
                  type="departamento"
                  placeholder="Digite seu departamento"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                />
                <ErrorMessage
                  name="departamento"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-lg font-medium font-Inter">Curso</label>
                <Field
                  name="curso"
                  type="curso"
                  placeholder="Digite seu curso"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                />
                <ErrorMessage
                  name="curso"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mt-8 flex justify-between items-center">
                <div>
                  <input type="checkbox" id="remember" />
                  <label
                    className="ml-2 font-medium font-Inter text-base"
                    htmlFor="remember"
                  >
                    Lembre de mim
                  </label>
                </div>
                <button className="font-medium font-Inter text-base text-green-500">
                  Esqueci a Senha
                </button>
              </div>
              <div className="mt-8 flex flex-col gap-y-4">
                <button
                  type="submit"
                  className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-green-500 text-white text-lg font-bold font-Inter"
                >
                  Entrar
                </button>
              </div>
              <div className="mt-8 flex justify-center items-center">
                <p className="font-medium font-Inter text-base">Não possui conta?</p>
                <button className="text-green-500 text-base font-medium ml-2 font-Inter">
                  Criar Conta
                </button>
              </div>
            </Form>
          </Formik>
          {/* Formik termina aqui */}
        </div>
      </div>

      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-green-200">
        <Image
          src="/images/unblogo.png"
          alt="Logo da Universidade"
          width={500}
          height={500}
          className="w-1/2 h-auto"
        />
      </div>
    </div>
  );
}

