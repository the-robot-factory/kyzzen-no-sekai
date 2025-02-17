'use client';
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import Modal from '@/components/modal/modal';
import GradientButton from '@/components/button/button';
import Image from 'next/image';
import { socialProvider, walletProvider } from '@/constants/provider';
import { useConnectAndSignMessage } from '@/api/wallet';
import { SOCIAL_PROVIDERS_TYPE, WALLET_PROVIDERS_TYPE } from '@/types/types';
import { useUser } from '@/context/user';
import { useAuth } from '@/context/auth';
import { useVerifyAuth } from '@/api/social';

const WhitelistRegistration: React.FC = () => {
  const [signInModal, setSignInModal] = useState(false)
  const { mutateAsync: connectAndSignMessage } = useConnectAndSignMessage()
  const { mutateAsync: verifyAuthCode } = useVerifyAuth()
  const { linkAuth } = useAuth()
  const { createSession } = useUser()
  const searchParams = new URLSearchParams(window.location.search);

  const router = useRouter()

  const nav = (route: string) => {
    router.push(route);
  };

  useEffect(() => {
    const provider = localStorage.getItem('provider')
    const code = searchParams.get("code"),
      state = searchParams.get("state")
    if (!code || !state || state !== provider) {
      return
    }
    handleCode(code, provider as SOCIAL_PROVIDERS_TYPE)
    nav(location.pathname)
  }, [searchParams])

  const handleCode = async (code: string, provider: SOCIAL_PROVIDERS_TYPE) => {
    const response = await verifyAuthCode({ provider, code, redirect_url: location.href, login: true })

    if (!response?.success) return
    if (response.account_exist && response.token && response.account?.id) {
      createSession(response.token, response.account?.id)
      nav('/whitelist-profile')
    }
  }

  const connectAndSign = async (provider: WALLET_PROVIDERS_TYPE) => {
    const data = await connectAndSignMessage(provider)
    console.log(data);

    if (!data) return
    if (data.account_exist && data.token && data.profile?.id) {
      createSession(data.token, data.profile.id)
      nav('/whitelist-profile')
    }
    // toast.success("Wallet linked successfully")
    // const addr = data.address || ""
    // setWallets([...wallets, addr])
    // setShowWalletModal(current => !current)
  }


  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>WHITELIST REGISTRATION</h1>
        <p className={styles.subtitle}>
          Sign in / setup your Kyzzen profile to register for the whitelist or to view qualification status.
        </p>
        <div className={styles.buttons}>
          <button className={styles.setupButton} onClick={() => nav('/whitelist-profile')}>Set Up Kyzzen Profile</button>
          <button className={styles.signInButton} onClick={() => setSignInModal(true)}>Sign In to Kyzzen Profile</button>
        </div>
      </div>
      <Modal show={signInModal} hide={() => setSignInModal(false)} className={styles.profile_modal}>
        <div>
          <h2 className={styles.modal_title}>Connect Your Wallet</h2>
          <p className={styles.modal_subtitle}>Sign a message to verify wallet</p>
          <div className={styles.wallet_buttons}>
            {walletProvider.map((provider) => (
              <GradientButton key={provider.label} className={styles.wallet_button} onClick={() => connectAndSign(provider.id)}>
                <div>
                  <Image src={provider.icon} alt={provider.label} width={20} height={20} priority />
                  {provider.label}
                </div>
              </GradientButton>
            ))
            }
          </div>

          <div className={styles.divider}>OR</div>
          <h2 className={styles.divider_text}>Sign In With</h2>
          <div className={styles.sign_in_buttons}>
            {socialProvider.map((provider) => (
              <GradientButton key={provider.id} className={styles.sign_in_button} onClick={() => linkAuth(provider.id, location.href)}>
                <div>
                  <Image src={provider.icon} alt={provider.account} width={20} height={20} priority />
                  {provider.account}
                </div>
              </GradientButton>
            ))
            }
          </div>
          <div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WhitelistRegistration;
