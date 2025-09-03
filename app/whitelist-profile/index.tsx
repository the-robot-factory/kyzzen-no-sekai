/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Table from '@/components/table/table';
import styles from './page.module.css';
import Image from 'next/image';
import {SOCIAL_PROVIDERS} from '@/types/enums';
import {useState} from 'react';
import {SOCIALS} from '@/types/types';
import {screens} from '@/constants/screen';
import Tooltip from '@/components/tooltip/tooltip';
import Link from 'next/link';
import {useUser} from '@/context/user';
import {useFetchEligibleCommunities, useFetchPointBreakdown, useFetchProfile} from '@/api/hooks/profile';
import Modal from '@/components/modal/modal';
import {useRegisterWhitelist} from '@/api/hooks/whitelist';
import GradientButton from '@/components/button/button';
import WhitelistSkeleton, {PartnerSkeleton, PointSkeleton} from './skeleton';
import {KYZZEN_BASE} from '@/constants/url';

const WhitelistProfile = () => {
  const {userSession} = useUser();

  const {data: profile, isFetching}: any = useFetchProfile(userSession?.id ?? '');
  const {data: spots, isFetching: fetchingEligible}: any = useFetchEligibleCommunities(userSession?.token ?? '');
  const {data: point, isFetching: fetchingBreakdown}: any = useFetchPointBreakdown(userSession?.token ?? '');
  const {mutateAsync: register, isPending} = useRegisterWhitelist();
  const [registrationModal, setRegistrationModal] = useState(false);

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
          Not subscribed to Solana Pulse yet.{' '}
          <a href="https://solana-pulse.ghost.io/" target="_blank" rel="noopener noreferrer" className={styles.link_action}>
            Subscribe here.
          </a>
        </>
      ),
    },
    {
      id: SOCIAL_PROVIDERS.X,
      account: 'Twitter (X)',
      icon: '/svg/x.svg',
      linkedAccount: profile?.twitterUsername,
      status: profile?.twitterVerified && profile?.twitterVerifiedOhme,
      action: (
        <>
          {!profile?.twitterVerified && (
            <div>
              Not following Kyzzen yet.{' '}
              <a href="https://x.com/Kyzzen_io" target="_blank" rel="noopener noreferrer" className={styles.link_action}>
                Follow Kyzzen.
              </a>
            </div>
          )}

          {!profile?.twitterVerifiedOhme && (
            <div>
              Not following OhMeOhMy_Sol yet.{' '}
              <a href="https://x.com/OhMeOhMy_Sol" target="_blank" rel="noopener noreferrer" className={styles.link_action}>
                Follow OhMeOhMy_Sol.
              </a>
            </div>
          )}
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
          <a href="https://discord.gg/kyzzen" target="_blank" rel="noopener noreferrer" className={styles.link_action}>
            Join here.
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
          <a href="https://t.me/kyzzen_bot" target="_blank" rel="noopener noreferrer" className={styles.link_action}>
            Try it out here.
          </a>
        </>
      ),
    },
  ];

  const goToProfile = () => {
    window.open(KYZZEN_BASE + '/profile-setup', '_blank');
  };

  const spotsQualified = spots?.filter((spot: any) => spot?.eligible);
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
              <br />
              <p>
                We require the above in order to assign you the “Whitelisted” role in our Discord and notify you of your Whitelist
                status via our Telegram bot.
              </p>{' '}
              <br />
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
            <button className={styles.wallet_button} onClick={goToProfile}>
              Link / Unlink Connections
            </button>
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
              Linked Wallets
              <Tooltip
                placement={window.innerWidth < screens.mobile.max ? 'bottom-start' : 'right'}
                text="Linking your wallet allows us to assess which whitelist partner community you are a part of. Please note that your Primary Wallet will be your whitelisted wallet address."
              >
                <Image src="/svg/tooltip.svg" alt="info" width={20} height={20} />
              </Tooltip>
            </h2>
            <button className={styles.wallet_button} onClick={goToProfile}>
              Add / Unlink Wallets
            </button>
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
        <div>
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
              <Link href="/whitelist" target="_blank">
                View point system
              </Link>
            </div>
            <div className={styles.network}>
              <p className={styles.network_text}>Rank = {profile?.leaderboardPosition}</p>
              <p className={styles.network_text}>Points = {profile?.points}</p>
              {fetchingBreakdown && <PointSkeleton />}
              <ul>
                <li>Linking Social Media Accounts = {point?.data?.breakdown?.connect_discord} points</li>
                <li>Following Kyzzen&apos;s Social Media Accounts = 50 points</li>
                <li>Kyzzen Academy Courses Completed = 50 points</li>
                <li>Referrals = 100 points</li>
                <li>Staking SOL with Kyzzen Validator = 20 points</li>
                <li>Daily Logins = 12 points </li>
              </ul>
            </div>
          </section>
        </div>
        <div className={styles.section}></div>

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
            <Link href="/whitelist" target="_blank">
              View whitelist partner communities
            </Link>
          </div>
          <div className={styles.network}>
            <p className={styles.network_text}>
              You qualify under {spotsQualified?.length ?? 0} out of {spots?.length ?? 0} whitelist partner community raffles.
            </p>
            {fetchingEligible && <PartnerSkeleton />}
            <div className={styles.grid_section}>
              {!fetchingEligible &&
                [...spots]
                  ?.sort((a, b) => b.eligible - a.eligible)
                  ?.map((spot: any, index: number) => (
                    <div key={index} className={`${styles.member_card} ${!spot.eligible && styles.member_card_faded}`}>
                      {spot.Image ? (
                        <Image className={styles.avatar} src={spot.Image} alt="girl" width={65} height={65} priority />
                      ) : (
                        <div className={styles.avatar_placeholder}></div>
                      )}
                      <div className={styles.member_details}>
                        <h3 className={styles.member_name}>{spot.CollectionName}</h3>
                        <p className={styles.member_role}>{spot.NumberOfSpots} spots</p>
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
              ? "Joined Kyzzen's Discord server."
              : data.id === SOCIAL_PROVIDERS.X
                ? 'Following Kyzzen and OhMeOhMy_Sol.'
                : data.id === SOCIAL_PROVIDERS.Mail
                  ? 'Suscribed to Solana Pulse.'
                  : data.id === SOCIAL_PROVIDERS.Telegram
                    ? "Using Kyzzen's Telegram Bot."
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
