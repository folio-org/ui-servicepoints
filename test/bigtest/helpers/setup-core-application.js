import setupStripesCore from '@folio/stripes-core/test/bigtest/helpers/setup-application';

export default function setupCoreApplication({
  scenarios,
  permissions = {},
  hasAllPerms = true,
  modules,
  translations,
  currentUser,
} = {}) {
  setupStripesCore({
    mirageOptions: { serverType: 'miragejs' },
    scenarios,
    permissions,
    modules,
    translations,
    stripesConfig: {
      hasAllPerms,
    },
    currentUser,
  });
}
