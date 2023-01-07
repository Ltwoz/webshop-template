import { useRouter } from "next/router";
import { useContext, useRef } from "react";
import Layout from "../../components/layouts/main-layout";
import UserContext from "../../contexts/user/user-context";

const LoginPage = () => {
    const router = useRouter();
    const usernameRef = useRef();
    const passwordRef = useRef();

    const { login, loading, error, success } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const enteredUsername = usernameRef.current.value;
        const enteredPassword = passwordRef.current.value;

        login(enteredUsername, enteredPassword);
        router.replace("/")
    };

    return (
        <Layout>
            <main className="bg-purple-900  bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-screen w-full overflow-hidden">
                <div className="relative max-w-[1150px] mx-auto min-h-full sm:flex sm:flex-row justify-center bg-transparent">
                    <div className="flex-col flex  self-center lg:px-14 sm:max-w-4xl xl:max-w-md  z-10">
                        <div className="self-start hidden lg:flex flex-col  text-gray-300">
                            <h1 className="my-3 font-semibold text-4xl">
                                SRVT
                            </h1>
                            <p className="pr-3 text-sm opacity-75">
                                รับกดผล รับฟามราคาถูก และยังมี Robux VIPSERVER
                                ในราคาสุดคุ้มอีกมากมาย ว่าไม่จะไก่ตันหรือ
                                ไอดีต่างๆที่นี้มีขาย
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center self-center z-10">
                        <div className="p-8 bg-white mx-auto rounded-3xl w-[21rem]">
                            <div className="mb-7">
                                <h3 className="font-semibold text-2xl text-gray-800">
                                    เข้าสู่ระบบ{" "}
                                </h3>
                                <p className="text-gray-400 mt-3">
                                    ยังไม่มีบัญชีใช่ไหม ?{" "}
                                    <a
                                        href="#"
                                        className="text-sm text-purple-700 hover:text-purple-700"
                                    >
                                        สร้างบัญชี
                                    </a>
                                </p>
                            </div>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="">
                                    <input
                                        className=" w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                                        type="text"
                                        ref={usernameRef}
                                        placeholder="Username"
                                    />
                                </div>

                                <div
                                    className="relative"
                                    x-data="{ show: true }"
                                >
                                    <input
                                        placeholder="Password"
                                        type="password"
                                        ref={passwordRef}
                                        className="text-sm px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-purple-400"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="text-sm ml-auto">
                                        <a
                                            href="#"
                                            className="text-purple-700 hover:text-purple-600"
                                        >
                                            ลืมรหัสผ่าน?
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center bg-purple-800  hover:bg-purple-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500"
                                    >
                                        เข้าสู่ระบบ
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default LoginPage;

export { getServerSideProps } from "../../utils/get-init-data";
