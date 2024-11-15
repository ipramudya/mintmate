import "./globals.css";

import { JotaiProvider, Nav, WalletButtonRenderer } from "@/components";
import { GeistSans } from "geist/font/sans";
import { type PropsWithChildren } from "react";
import { Toaster } from "sonner";
import { ThirdwebProvider } from "thirdweb/react";

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en" className={`${GeistSans.variable} antialiased`}>
            <body>
                <Toaster position="top-center" duration={5000} closeButton richColors />
                <ThirdwebProvider>
                    <JotaiProvider>
                        <Nav>
                            <WalletButtonRenderer />
                        </Nav>
                        {children}
                    </JotaiProvider>
                </ThirdwebProvider>
            </body>
        </html>
    );
}
