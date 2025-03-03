/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Table from '@/components/table/table';
import styles from './page.module.css';
import Image from 'next/image';
import {SOCIAL_PROVIDERS} from '@/types/enums';
import {useState} from 'react';
import {SOCIALS, WhitelistSpot} from '@/types/types';
import {screens} from '@/constants/screen';
import Tooltip from '@/components/tooltip/tooltip';
import Link from 'next/link';
import {useUser} from '@/context/user';
import {useFetchProfile} from '@/api/hooks/profile';
import Modal from '@/components/modal/modal';
import {useFetchWhitelistSpots, useRegisterWhitelist} from '@/api/hooks/whitelist';
import GradientButton from '@/components/button/button';
import WhitelistSkeleton from './skeleton';

const WhitelistProfile = () => {
  const {userSession} = useUser();

  const {data: profile, isFetching}: any = useFetchProfile(userSession?.id ?? '');
  const {mutateAsync: register, isPending} = useRegisterWhitelist();
  const [registrationModal, setRegistrationModal] = useState(false);
  const {data: spots} = useFetchWhitelistSpots();

  const handleRegistration = async () => {
    await register(userSession?.token ?? '');
  };

  const socials: SOCIALS[] = [
    {
      id: SOCIAL_PROVIDERS.Mail,
      icon: '/svg/google.svg',
      account: 'Gmail',
      linkedAccount: profile?.email,
      status: profile?.emailVerified,
      action: (
        <>
          Not subscribed to Kyzzen Newsletter yet.{' '}
          <a href="https://nft-today.ghost.io/" className={styles.link_action}>
            Subscribe here
          </a>
        </>
      ),
    },
    {
      id: SOCIAL_PROVIDERS.X,
      account: 'Twitter (X)',
      icon: '/svg/x.svg',
      linkedAccount: profile?.twitterUsername,
      status: profile?.discordVerified,
      action: (
        <>
          Not following Kyzzen yet.{' '}
          <a href="https://x.com/Kyzzen_io" className={styles.link_action}>
            Follow Here
          </a>
        </>
      ),
    },
    {
      id: SOCIAL_PROVIDERS.Discord,
      account: 'Discord',
      icon: '/svg/discord.svg',
      linkedAccount: profile?.discordUsername,
      status: profile?.discordVerified,
      action: (
        <>
          Haven&apos;t joined discord server yet.{' '}
          <a href="https://discord.gg/kyzzen" className={styles.link_action}>
            Join here
          </a>
        </>
      ),
    },
    {
      id: SOCIAL_PROVIDERS.Telegram,
      account: 'Telegram',
      icon: '/svg/telegram.svg',
      linkedAccount: profile?.telegramUsername,
      status: profile?.telegramVerified,
      action: (
        <>
          Not using Kyzzen’s Telegram Bot yet.{' '}
          <a href="https://t.me/kyzzen_bot" className={styles.link_action}>
            Try it out here.
          </a>
        </>
      ),
    },
    {
      id: SOCIAL_PROVIDERS.YouTube,
      account: 'YouTube',
      icon: '/svg/youtube.svg',
      linkedAccount: profile?.youtubeUsername,
      status: profile?.youtubeVerified,
      action: (
        <>
          Not following Kyzzen yet.{' '}
          <a href="https://www.youtube.com/@kyzzenio" className={styles.link_action}>
            Follow here
          </a>
        </>
      ),
    },
  ];

  if (!isFetching && profile) {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>WHITELIST REGISTRATION</h1>

        {/* Profile Section */}
        <div className={styles.profile_card}>
          <div className={styles.profile_info}>
            <Image
              className={styles.profile_image}
              src={profile?.thumbnailURL ?? '/images/founder.png'}
              alt="girl"
              width={65}
              height={65}
              priority
            />
            <span className={styles.username}>{profile?.username}</span>
          </div>
        </div>

        {/* Registration Status */}
        <div className={styles.registration_status}>
          <span>
            Registration Status:
            {!profile?.registeredWhitelist ? (
              <span className={styles.not_registered}> Not Registered</span>
            ) : (
              <span className={styles.registered}> Registered</span>
            )}
          </span>
          {!profile?.registeredWhitelist && (
            <button onClick={() => setRegistrationModal(true)} className={styles.register_button}>
              Register for Whitelist
            </button>
          )}

          <Modal show={registrationModal} hide={() => setRegistrationModal(false)} heading="Register for Whitelist">
            <div className={styles.reg_modal}>
              <p>Please ensure that you complete the following in order to register for our Whitelist:</p>
              <ul>
                <li>Link your Discord Profile</li>
                <li>Get verified in our Discord Server</li>
                <li>Link your Telegram Profile</li>
                <li>Activate our Telegram Bot</li>
              </ul>
              <p>
                We require the above in order to assign you the “Whitelisted” role in our Discord and notify you of your Whitelist
                status via our Telegram bot.
              </p>{' '}
              <p>
                Please note that if you reverse any of the above required actions, you will be unregistered from the whitelist
                accordingly
              </p>
              <br />
              <GradientButton onClick={handleRegistration}>{isPending ? 'Registering...' : 'Proceed'}</GradientButton>
              <br />
            </div>
          </Modal>
        </div>

        {/* Connections */}
        <div className={styles.section}>
          <div className={styles.section_header}>
            <h2>
              Connections
              <Tooltip
                placement={window.innerWidth < screens.mobile.max ? 'bottom-start' : 'right'}
                text="You are awarded 10 points for each account that is connected to your Kyzzen Profile, as well as each successful verification that you are following/subscribed to Kyzzen’s accounts. "
              >
                <Image src="/svg/tooltip.svg" alt="info" width={20} height={20} />
              </Tooltip>
            </h2>
            <button className={styles.wallet_button}>Link / Unlink Connections</button>
          </div>
          <Table
            header={[{name: 'Account'}, {name: 'Linked Account'}, {name: 'Status'}]}
            body={socials}
            isRow
            Row={SocialRow}
            style={{margin: '0 auto', height: 'fit-content'}}
            className={styles.connection_table}
          />
        </div>

        {/* Wallets */}
        <div className={styles.section}>
          <div className={styles.section_header}>
            <h2>
              Your Linked Wallets
              <Tooltip
                placement={window.innerWidth < screens.mobile.max ? 'bottom-start' : 'right'}
                text="Linking your wallet allows us to assess which whitelist partner community you are a part of. Please note that your Primary Wallet will be your whitelisted wallet address."
              >
                <Image src="/svg/tooltip.svg" alt="info" width={20} height={20} />
              </Tooltip>
            </h2>
            <button className={styles.wallet_button}>Add / Unlink Wallets</button>
          </div>
          <Table
            header={[{name: 'Network'}, {name: 'Address'}, {name: ''}]}
            body={profile?.wallets}
            isRow
            Row={WalletRow}
            style={{margin: '0 auto', height: 'fit-content'}}
            className={styles.connection_table}
          />
        </div>

        {/* Qualification */}
        <div className={styles.section}>
          <div className={styles.section_header}>
            <h2>Qualification</h2>
          </div>
          <section className={styles.network_section}>
            <div className={styles.network_header}>
              <div className={styles.network_tooltip}>
                Whitelist Leaderboard
                <Tooltip
                  placement={window.innerWidth < screens.mobile.max ? 'bottom-start' : 'right'}
                  text="Top 500 users on the Whitelist Leaderboard at the end of the whitelist period will be awarded 1 whitelist spot."
                >
                  <Image src="/svg/tooltip.svg" alt="info" width={20} height={20} />
                </Tooltip>
              </div>
              <Link href="/whitelist">View point system</Link>
            </div>
            <div className={styles.network}>
              <p className={styles.network_text}>Rank = 0</p>
              <p className={styles.network_text}>Points = {profile?.points}</p>
            </div>
          </section>
        </div>

        <section className={styles.network_section}>
          <div className={styles.network_header}>
            <div className={styles.network_tooltip}>
              Whitelist Partner Communities
              <Tooltip
                placement={window.innerWidth < screens.mobile.max ? 'bottom-start' : 'right'}
                text="Please note that you can only obtain 1 whitelist spot in this category - however, the more Whitelist Partner Communities you are a part of (based on your ownership of their NFTs), the more chances you get for a whitelist spot. "
              >
                <Image src="/svg/tooltip.svg" alt="info" width={20} height={20} />
              </Tooltip>
            </div>
            <Link href="/whitelist">View whitelist partner communities</Link>
          </div>
          <div className={styles.network}>
            <p className={styles.network_text}>You qualify under 5 out of 40 whitelist partner community allocations.</p>
            <div className={styles.grid_section}>
              {spots?.map((spot: WhitelistSpot, index: number) => (
                <div key={index} className={styles.member_card}>
                  {spot.image ? (
                    <Image className={styles.avatar} src={spot.image} alt="girl" width={65} height={65} priority />
                  ) : (
                    <div className={styles.avatar_placeholder}></div>
                  )}
                  <div className={styles.member_details}>
                    <h3 className={styles.member_name}>{spot.collectionName}</h3>
                    <p className={styles.member_role}>{spot.numberOfSpots} spots</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  } else {
    return <WhitelistSkeleton />;
  }
};

export default WhitelistProfile;

const SocialRow = ({data}: {data: SOCIALS}) => {
  return (
    <tr className={styles.row}>
      <td>
        <div>
          <Image src={data?.icon} alt="social" width={20} height={20} />
          {data?.account}
        </div>
      </td>
      <td>{data.linkedAccount ? data?.linkedAccount : <span className={styles.not_linked}>No account linked</span>}</td>
      <td>
        {data.status ? (
          <span className={styles.joined}>
            {data.id === SOCIAL_PROVIDERS.Discord
              ? "Joined Kyzzen's Discord server"
              : data.id === SOCIAL_PROVIDERS.X
                ? 'Following Kyzzen'
                : data.id === SOCIAL_PROVIDERS.Mail
                  ? 'Suscribed to Kyzzen Newsletter'
                  : data.id === SOCIAL_PROVIDERS.Telegram
                    ? "Using Kyzzen'n Telegram Bot"
                    : 'Joined ' + data.account}
          </span>
        ) : (
          data.action
        )}
      </td>
    </tr>
  );
};

const WalletRow = ({data}: {data: string}) => {
  const isPrimary = (addr: string) => {
    return addr.includes('primary:');
  };
  return (
    <tr className={styles.row}>
      <td>
        <div>
          {isPrimary(data) ? (
            <Image src="/svg/star-fill.svg" alt="star" width={20} height={20} />
          ) : (
            <Image src="/svg/star-stroke.svg" alt="star" width={20} height={20} />
          )}
          <Image src="/svg/sol-spl.svg" alt="sol" width={20} height={20} />
        </div>
      </td>
      <td>{data?.replace('primary:', '')}</td>
      <td></td>
    </tr>
  );
};
