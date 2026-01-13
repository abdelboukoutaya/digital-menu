export const config = {
    PORT: process.env.PORT || 3001,

    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,

    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: "1d",
}
