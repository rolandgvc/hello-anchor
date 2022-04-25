use anchor_lang::prelude::*;

declare_id!("GzScbxmzfKMTV7NdfNDF5f4C8EtRtzR3aB8VzgM5g24s");

#[program]
mod hello_anchor {
    use super::*;

    pub fn create(ctx: Context<Create>) -> Result<()> {
        let counter_account = &mut ctx.accounts.counter_account;
        counter_account.count = 0;
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let counter_account = &mut ctx.accounts.counter_account;
        counter_account.count += 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer = authority, space = 8 + 8)]
    pub counter_account: Account<'info, CounterAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    pub counter_account: Account<'info, CounterAccount>,
}

#[account]
pub struct CounterAccount {
    pub count: u64,
}
