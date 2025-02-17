import { SOCIAL_PROVIDERS, WALLET_PROVIDERS } from "@/types/enums";
import { SOCIALS } from "@/types/types";

export const walletProvider = [
    {
        id: WALLET_PROVIDERS.Phantom,
        label: "Phantom",
        icon: "/svg/phantom.svg",
    },
    {
        id: WALLET_PROVIDERS.Solflare,
        label: "Solflare",
        icon: "/svg/solflare.svg",
    },
]

export const socialProvider: Omit<SOCIALS, 'linkedAccount'>[] = [
    {
        id: SOCIAL_PROVIDERS.Mail,
        icon: "/svg/google-2.svg",
        account: 'Email',
        status: false,
    },
    {
        id: SOCIAL_PROVIDERS.X,
        account: 'Twitter (X)',
        icon: "/svg/x.svg",
        status: false,
    },
    {
        id: SOCIAL_PROVIDERS.Discord,
        account: 'Discord',
        icon: "/svg/discord-2.svg",
        status: false,
    }
]