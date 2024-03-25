// This file is used to create a super admin user when the application is started for the first time.
// Replace this file with src/index.js
"use strict";

const user = require("./user.json"); // User info to register admin user

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    const hasAdmin = await strapi.service("admin::user").exists();

    if (hasAdmin) {
      return;
    }

    const superAdminRole = await strapi.service("admin::role").getSuperAdmin();

    if (!superAdminRole) {
      return;
    }
    console.log(user);

    await strapi.service("admin::user").create({
      email: user.email || "test@example.com",
      firstname: user.firstname || "John",
      lastname: user.lastname || "Doe",
      password:
        user.firstname + user.lastname + "123!@#" || "G3n3r@t3dP@ssw0rd",
      registrationToken: null,
      isActive: true,
      roles: superAdminRole ? [superAdminRole.id] : [],
    });

    // TODO: We can trigger the email sending here!
  },
};
