import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/login/', {
                username,
                password,
            });
            console.log(response.data);
            router.push('/'); // ホームページにリダイレクト
        } catch (error) {
            console.error(error);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-white p-4">
            {/* タイトル部分 */}
            <h1 className="text-4xl font-bold mt-[100px] mb-5">LOGIN</h1>
            <hr className="w-3/4 max-w-2xl border-t-2 border-black mb-5" /> {/* 区切り線の幅をさらに広く */}

            <div className="flex w-full max-w-2xl justify-between items-stretch"> {/* 最大幅を調整 */}
                {/* ログインフォーム */}
                <form className="w-1/2 flex flex-col space-y-8" onSubmit={handleSubmit}>
                    <h2 className="text-[20px] font-semibold text-center mt-5 mb-5">
                        会員登録されている方
                    </h2>
                    <div>
                        <label className="block text-sm mb-2">
                            ユーザー名
                            <input
                                type="text"
                                className="mt-1 w-full p-2 text-xl border-b-2 border-gray-400 focus:outline-none focus:border-black transition-colors"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm mb-2">
                            パスワード
                            <input
                                type="password"
                                className="mt-1 w-full p-2 text-xl border-b-2 border-gray-400 focus:outline-none focus:border-black transition-colors"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <button className="px-20 py-2 bg-black text-white hover:bg-gray-800">
                        ログイン
                    </button>
                    <a href="#" className="text-black underline text-center">
                        パスワードを忘れた？
                    </a>
                </form>

                {/* 区切り線 */}
                <div className="w-px bg-black mx-10"></div>

                {/* 新規登録リンク */}
                <div className="w-1/2 flex flex-col items-center space-y-6">
                    <h2 className="text-[20px] font-semibold text-center mt-5 mb-5">
                        会員登録されていない方
                    </h2>
                    <Link href="/accounts/signup">
                        <button className="relative px-20 py-2 text-black font-semibold border-2 border-black hover:text-white hover:bg-black transition-all">
                            新規登録
                            {/* アウトラン風アウトライン */}
                            <span className="absolute inset-0 border-2 border-pink-500 -z-10 opacity-75 blur-md"></span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
