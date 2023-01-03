import Image from "next/image";
import Layout from "../../components/layouts/main-layout";

// Fetch api/categories

const Store = () => {
    return (
        <Layout>
            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-24 md:pt-28 mx-auto min-h-screen items-center">
                <h1 className="text-center text-4xl font-bold mb-8">
                    หมวดหมู่สินค้า
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12 transition-all duration-500 ease-in-out">
                    <div className="relative overflow-hidden bg-slate-800">
                        <Image
                            alt="category_img"
                            src={`https://cdn.discordapp.com/attachments/882008334801178637/953394251805376532/roy_x_package.jpg`}
                            draggable="false"
                            width={350}
                            height={350}
                            className="w-full select-none"
                        />
                        <div className="p-4">
                            <h1 className="text-lg font-bold text-white">
                                Category #1
                            </h1>
                        </div>
                    </div>
                    <div className="relative overflow-hidden bg-slate-800">
                        <Image
                            alt="category_img"
                            src={`https://cdn.discordapp.com/attachments/882008334801178637/953394251805376532/roy_x_package.jpg`}
                            draggable="false"
                            width={350}
                            height={350}
                            className="w-full select-none"
                        />
                        <div className="p-4">
                            <h1 className="text-lg font-bold text-white">
                                Category #2
                            </h1>
                        </div>
                    </div>
                    <div className="relative overflow-hidden bg-slate-800">
                        <Image
                            alt="category_img"
                            src={`https://cdn.discordapp.com/attachments/882008334801178637/953394251805376532/roy_x_package.jpg`}
                            draggable="false"
                            width={350}
                            height={350}
                            className="w-full select-none"
                        />
                        <div className="p-4">
                            <h1 className="text-lg font-bold text-white">
                                Category #3
                            </h1>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default Store;

export { getServerSideProps } from "../../utils/get-init-data";