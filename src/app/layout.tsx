/** @format */

//import type { Metadata } from "next";
//import { Inter } from "next/font/google";
import "./globals.css";
import "st/talkback.css";
import "st/ld_dual_ring.css";
import "st/input.css";
import "st/card_notification.css";

//const inter = Inter({ subsets: ["latin"] });

/*
export const metadata: Metadata = {
	title: "web linux",
	description: "app web interface linux"
};
*/

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<head>
				<link rel='manifest' href='/manifest.json' />
				<link
					href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0'
					rel='stylesheet'
				/>
			</head>
			<body className={"inter.className"}>{children}</body>
		</html>
	);
}
