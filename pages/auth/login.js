import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useRef } from "react";
import Layout from "../../components/layouts/main-layout";
import ConfigContext from "../../contexts/config/config-context";
import { getSession, signIn, getProviders, getCsrfToken } from "next-auth/react";
import { withInitProps } from "../../utils/get-init-data";

const LoginPage = () => {
    const router = useRouter();
    const usernameRef = useRef();
    const passwordRef = useRef();

    const { configs } = useContext(ConfigContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const enteredUsername = usernameRef.current?.value;
        const enteredPassword = passwordRef.current?.value;

        const result = await signIn("credentials", {
            redirect: false,
            username: enteredUsername,
            password: enteredPassword,
        });

        console.log(result);

        router.replace("/");
    };

    return (
        <Layout>
            <main className="max-w-[1150px] h-full sm:px-[17px] pb-4 sm:pb-[25px] pt-20 md:pt-28 mx-auto items-center">
                <div className="w-full flex items-center justify-center">
                    <div className="w-[30rem] p-6 bg-white rounded-xl shadow-md">
                        <div className="mb-7 text-center">
                            <h3 className="font-semibold text-2xl text-gray-800">
                                เข้าสู่ระบบ{" "}
                            </h3>
                        </div>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="">
                                <input
                                    className=" w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                                    type="text"
                                    ref={usernameRef}
                                    placeholder="ชื่อผู้ใช้งาน"
                                />
                            </div>
                            <div className="relative">
                                <input
                                    placeholder="รหัสผ่าน"
                                    type="password"
                                    ref={passwordRef}
                                    className="text-sm px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-primary"
                                />
                            </div>

                            <div className="flex items-center justify-end text-sm">
                                <a
                                    href="#"
                                    className="text-primary hover:text-purple-600 hover:underline"
                                >
                                    ลืมรหัสผ่าน?
                                </a>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center bg-primary  hover:bg-purple-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold cursor-pointer transition-all"
                                >
                                    เข้าสู่ระบบ
                                </button>
                            </div>
                        </form>
                        <p className="text-gray-400 text-center text-sm mt-8">
                            ยังไม่มีบัญชีใช่ไหม?{" "}
                            <Link
                                href="/auth/register"
                                className="text-sm ml-1 text-primary hover:text-purple-700 hover:underline"
                            >
                                สร้างบัญชี
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default LoginPage;

// export { getServerSideProps } from "../../utils/get-init-data";

export const getServerSideProps = withInitProps(async (context) => {
    const session = await getSession(context);

	if (session && session.user) {
		return {
			redirect: {
				permanent: false,
				destination: '/'
			},
			props: {}
		};
	}

	return {
		props: {
			providers: await getProviders(),
			csrfToken: await getCsrfToken(context)
		}
	};
});
