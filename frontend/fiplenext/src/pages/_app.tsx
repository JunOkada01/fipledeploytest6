import "@styles/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthHeader from '../components/AccontsHeader';
import Head from 'next/head'
import Link from "next/link";
import '@fortawesome/fontawesome-svg-core'
import'@fortawesome/free-solid-svg-icons'
import'@fortawesome/react-fontawesome'
import { GOOGLE_FONT_PROVIDER } from "next/dist/shared/lib/constants";
import { motion } from "framer-motion";
//import Image from "next/image";
//import Link from 'next/link'


function App({ Component, pageProps }: AppProps) {
  const router = useRouter();     // ユーザーのURL（ルートパス）を取得
  //ここにfooterを追加してすみません↓
  const isAuthPage = ['/accounts/login', '/accounts/signup','/footer/company','/footer/privacypolicy','/footer/ToU','/footer/tokushoho'].includes(router.pathname);
  // 現在のパスがログイン・新規登録画面かどうかを判定

  return (
    <>
      <Head>
        <Link rel="preconnect" href="https://fonts.googleapis.com"></Link>
        <Link rel="preconnect" href="https://fonts.gstatic.com"></Link>
        <Link href="https://fonts.googleapis.com/css2?family=Julius+Sans+One&family=Noto+Sans+JP:wght@100..900&display=swap" rel="stylesheet"></Link>
      </Head>
      {/* ログイン・神機登録画面ではAuthHeader、それ以外では通常のHeader */}
      {isAuthPage ? <AuthHeader /> : <Header />}
      <main style={{ padding: '0', marginBottom: '2rem' }}> 
        <Component {...pageProps} />
      </main>
      <Footer/>	
    </>
  );
}
 
export default App;