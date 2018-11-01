export const allowFoo = user => true;
export const disAllowFoo = user => {
    throw new Error(`Not allowed for token ${user.name}`);
};
