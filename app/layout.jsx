import "./globals.css";

export const metadata = {
	title: "CoderRank",
	description: "A programming platform for aspiring developers!",
};

export default function RootLayout({ children }) {
	return (
		<html>
			<body>
                {children}
			</body>
		</html>
	);
}