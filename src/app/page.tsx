import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { SearchDialog } from "@/src/components/SearchDialog";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.center}>
          <SearchDialog />
        </div>

        <div className="py-8 w-full flex items-center justify-center space-x-6">
          <div className="border-l border-gray-300 w-1 h-4" />
          <div className="flex items-center justify-center space-x-4">
            <div className="opacity-75 transition hover:opacity-100 cursor-pointer"></div>
          </div>
        </div>
      </main>
    </>
  );
}
