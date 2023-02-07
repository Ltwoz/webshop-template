import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import Layout from "../../components/layouts/main-layout";
import { withInitProps } from "../../utils/get-init-data";
import {
    getSession,
    signIn,
    getProviders,
    getCsrfToken,
} from "next-auth/react";
import axios from "axios";
import { useToast } from "../../contexts/toast/toast-context";

const RegisterPage = () => {
    const router = useRouter();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const enteredUsername = usernameRef.current.value;
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;
        const enteredConfirmPassword = confirmPasswordRef.current.value;

        if (enteredPassword !== enteredConfirmPassword) {
            confirmPasswordRef.current.focus();
            return toast.add({
                title: "ผิดพลาด!",
                text: "รหัสผ่านไม่ตรงกัน",
                icon: "error",
            });
        }

        const config = { headers: { "Content-Type": "application/json" } };

        const res = await axios
            .post(
                "/api/auth/register",
                {
                    username: enteredUsername,
                    email: enteredEmail,
                    password: enteredPassword,
                },
                config
            )
            .then(async () => {
                await signIn("credentials", {
                    redirect: false,
                    username: enteredUsername,
                    password: enteredPassword,
                });
            })
            .catch((error) => console.log(error));

        router.replace("/");
    };

    return (
        <Layout>
            <main className="max-w-[1150px] h-full sm:px-[17px] pb-4 sm:pb-[25px] pt-20 md:pt-28 mx-auto items-center">
                <div className="w-full flex items-center justify-center">
                    <div className="w-[95vw] md:w-[30rem] p-6 bg-white rounded-lg shadow-md">
                        <div className="mb-7 text-center">
                            <h3 className="font-semibold text-2xl text-gray-800">
                                สร้างบัญชี
                            </h3>
                        </div>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="">
                                <input
                                    className=" w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                                    type="text"
                                    ref={usernameRef}
                                    placeholder="ชื่อผู้ใช้งาน"
                                />
                            </div>
                            <div className="">
                                <input
                                    className=" w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                                    type="text"
                                    ref={emailRef}
                                    placeholder="อีเมล"
                                />
                            </div>
                            <div className="relative" x-data="{ show: true }">
                                <input
                                    placeholder="รหัสผ่าน"
                                    type="password"
                                    ref={passwordRef}
                                    className="text-sm px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div className="relative" x-data="{ show: true }">
                                <input
                                    placeholder="ยืนยันรหัสผ่าน"
                                    type="password"
                                    ref={confirmPasswordRef}
                                    className="text-sm px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center bg-primary rounded-lg transition-all overflow-hidden"
                                >
                                    <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-3 px-4">
                                        <span className="block tracking-wide">
                                            สร้างบัญชี
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </form>
                        <p className="text-gray-400 text-center text-sm mt-8">
                            มีบัญชีอยู่แล้ว?{" "}
                            <Link
                                href="/auth/login"
                                className="text-sm ml-1 text-primary hover:brightness-95 hover:underline"
                            >
                                เข้าสู่ระบบ
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default RegisterPage;

export const getServerSideProps = withInitProps(async (context) => {
    const session = await getSession(context);

    if (session && session.user) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
            props: {},
        };
    }

    return {
        props: {
            meta: { title: "Sign In" },
            providers: await getProviders(),
            csrfToken: await getCsrfToken(context),
        },
    };
});
