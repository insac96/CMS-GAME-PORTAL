export default defineAppConfig({
  ui: {
    primary: 'indigo',
    
    gray: 'zinc',

    icons: {
      dynamic: true
    },

    avatar: {
      rounded: 'rounded-3xl'
    },

    button: {
      default: {
        loadingIcon: 'i-bx-loader-alt'
      },
      rounded: 'rounded-3xl',
      color: {
        gray: {
          solid: 'ring-0 bg-gray-100'
        }
      }
    },

    card: {
      base: 'relative overflow-y-auto',
      rounded: 'rounded-3xl',
      ring: 'ring-0 dark:ring-1',
      shadow: 'shadow-lg',
      body: {
        padding: 'px-4 py-4 sm:p-4'
      },
      header: {
        padding: 'px-4 py-4 sm:px-4'
      },
      footer: {
        padding: 'px-4 py-4 pt-2 sm:px-4'
      }
    },

    input: {
      default: {
        color: 'gray',
        size: 'lg',
        loadingIcon: 'i-bx-loader-alt'
      },
      rounded: 'rounded-3xl',
      color: {
        gray: {
          outline: 'ring-0 bg-gray-100'
        }
      }
    },

    alert:{
      variant: {
        soft: 'bg-{color}-500 bg-opacity-10'
      },
      rounded: 'rounded-3xl',
    },

    badge: {
      variant: {
        soft: 'bg-{color}-500 bg-opacity-10'
      },
      rounded: 'rounded-3xl',
    },

    modal: {
      container: 'items-center',
      overlay: {
        background: 'bg-white/25 dark:bg-black/50 backdrop-blur'
      },
      base: 'overflow-x-hidden overflow-visible',
      rounded: 'rounded-3xl',
    },

    slideover: {
      overlay: {
        background: 'bg-white/25 dark:bg-black/50 backdrop-blur'
      }
    },

    notifications: {
      position: 'right-0 top-0 bottom-auto',
    },
    
    notification: {
      background: 'dark:bg-black/50 backdrop-blur',
      progress: {
        base: 'h-0.5'
      }
    },

    formGroup: {
      wrapper: 'mb-4',
      container: 'mt-2'
    },

    table: {
      th: {
        base: 'whitespace-nowrap'
      }
    },

    pagination: {
      wrapper: 'flex items-center gap-1',
      rounded: '!rounded-full min-w-[32px] justify-center'
    },

    select: {
      default: {
        loadingIcon: 'i-bx-loader-alt',
        color: 'gray',
        size: 'lg',
      },
      rounded: 'rounded-3xl',
      color: {
        gray: {
          outline: 'ring-0 bg-gray-100'
        }
      }
    },

    textarea: {
      default: {
        color: 'gray',
      },
      rounded: 'rounded-3xl',
      color: {
        gray: {
          outline: 'ring-0 bg-gray-100'
        }
      }
    }
  }
})