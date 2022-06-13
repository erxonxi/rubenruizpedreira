import { render } from '@testing-library/vue'
import { describe, it } from 'vitest'
import { createI18n } from 'vue-i18n'
import NavBarMenu from '../src/components/NavBarMenu.vue'
import { messages } from '~/modules/i18n'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages,
})

describe('NavBarMenu', () => {
  it('render & click', () => {
    const { getByTitle } = render(NavBarMenu, { global: { plugins: [i18n] } })
    const menuButton = getByTitle('Menu')
    menuButton.click()
  })
})
