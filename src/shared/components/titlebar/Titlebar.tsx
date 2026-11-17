import { useTranslation } from 'react-i18next'
import { TbLayoutSidebar, TbLayoutSidebarFilled } from 'react-icons/tb'
import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
  VscChromeRestore,
} from 'react-icons/vsc'
import { Button, cn, Separator } from '@heroui/react'
import { Unbounded } from 'next/font/google'
import { useRouter } from 'next/router'
import { Logo } from '@/shared/components/dashboard/Logo'
import { GlobalSearchBar } from '@/shared/components/search/GlobalSearchBar'
import { HelpDesk } from '@/shared/components/titlebar/HelpDesk'
import { Menu } from '@/shared/components/titlebar/Menu'
import { Notifications } from '@/shared/components/titlebar/Notifications'
import { UpdateButton } from '@/shared/components/UpdateButton'
import { useTitlebar } from '@/shared/hooks/useTitlebar'
import { usePlatformStore } from '@/shared/stores/platformStore'
import { useSidebarStore } from '@/shared/stores/sidebarStore'

const SHOW_TITLEBAR_SIDEBAR_TOGGLE = false

const unbounded = Unbounded({
  subsets: ['latin'],
  variable: '--font-unbounded',
})

interface TitlebarProps {
  minimal?: boolean
}

export const Titlebar = ({ minimal = false }: TitlebarProps) => {
  const { t } = useTranslation()
  const { isMaximized, minimize, toggleMaximize, close } = useTitlebar()
  const router = useRouter()
  const isDashboard = router.pathname.startsWith('/dashboard')
  const overArt = !minimal && !isDashboard
  const collapsed = useSidebarStore(state => state.collapsed)
  const hydrated = useSidebarStore(state => state.hydrated)
  const hasPro = true
  const forceReducedMotion = usePlatformStore(state => state.forceReducedMotion) === true
  const brandCollapsed = isDashboard && collapsed

  const proPill = (
    <span
      className={cn(
        'pro-pill pro-pill--glow ml-2 shrink-0 text-[10px] font-black tracking-[0.12em]',
        forceReducedMotion && 'force-reduced-motion',
      )}
      data-tauri-drag-region
    >
      <span className='pro-pill__inner' data-tauri-drag-region>
        PRO
      </span>
    </span>
  )
  const toggleSidebar = useSidebarStore(state => state.toggle)
  const updateAvailable = false //useUpdateStore(state => state.updateAvailable)

  return (
    <div
      className={cn(
        'fixed left-0 top-0 h-14 w-screen select-none',
        minimal
          ? 'z-9999 bg-transparent'
          : isDashboard
            ? 'z-50 border-b border-border bg-(--app-chrome)'
            : // The sign-in screen: AuthLayout's panel and SignInHero's art run up behind this bar
              'z-50',
      )}
      data-tauri-drag-region
    >
      <div className='flex h-14 w-full items-center' data-tauri-drag-region>
        {!minimal && (
          <>
            {}
            <div
              className={cn(
                'flex h-14 shrink-0 items-center',
                isDashboard && hydrated && 'transition-[width] duration-200',
                isDashboard
                  ? collapsed
                    ? 'w-16 justify-center'
                    : 'w-64 justify-start pl-4'
                  : 'justify-start pl-4',
              )}
              data-tauri-drag-region
            >
              <Logo />
              {(!isDashboard || !collapsed) && (
                <p
                  className={cn(
                    unbounded.className,
                    'ml-3 truncate text-sm font-semibold text-foreground',
                  )}
                  data-tauri-drag-region
                >
                  Steam Game Idler
                </p>
              )}
              {hasPro && !brandCollapsed && proPill}
            </div>
            {}
            {hasPro && brandCollapsed && proPill}

            <div className='flex h-14 shrink-0 items-center'>
              {isDashboard && SHOW_TITLEBAR_SIDEBAR_TOGGLE && (
                <Button
                  isIconOnly
                  aria-label={t('dashboard.settings.keybinds.toggleSidebar')}
                  className='h-14 w-12 rounded-none'
                  variant='ghost'
                  onPress={toggleSidebar}
                >
                  {collapsed ? (
                    <TbLayoutSidebarFilled fontSize={18} />
                  ) : (
                    <TbLayoutSidebar fontSize={18} />
                  )}
                </Button>
              )}
            </div>
          </>
        )}

        <div className='flex-1' data-tauri-drag-region />

        <div className='flex h-14 shrink-0 items-center justify-end'>
          {!minimal && (
            <>
              {updateAvailable && <UpdateButton />}
              {isDashboard && (
                <>
                  <HelpDesk />
                  <Notifications />
                  <Menu />
                </>
              )}

              {(isDashboard || updateAvailable) && <Separator orientation='vertical' />}
            </>
          )}

          <Button
            isIconOnly
            className={cn('h-14 w-12 rounded-none', overArt && 'titlebar-frosted')}
            variant='ghost'
            onPress={minimize}
          >
            <VscChromeMinimize fontSize={16} />
          </Button>
          <Button
            isIconOnly
            aria-label={isMaximized ? 'Restore' : 'Maximize'}
            className={cn('h-14 w-12 rounded-none', overArt && 'titlebar-frosted')}
            variant='ghost'
            onPress={toggleMaximize}
          >
            {isMaximized ? <VscChromeRestore fontSize={16} /> : <VscChromeMaximize fontSize={16} />}
          </Button>
          <Button
            isIconOnly
            className={cn(
              'h-14 w-12 rounded-none',
              overArt ? 'titlebar-frosted titlebar-frosted--close' : 'hover:bg-danger',
            )}
            variant='ghost'
            onPress={close}
          >
            <VscChromeClose fontSize={16} />
          </Button>
        </div>
      </div>

      {!minimal && <GlobalSearchBar />}
    </div>
  )
}
