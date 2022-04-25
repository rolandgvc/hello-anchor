import * as anchor from "@project-serum/anchor";
import * as assert from "assert";
import { Program } from "@project-serum/anchor";
import { HelloAnchor } from "../target/types/hello_anchor";
const { SystemProgram } = anchor.web3;


describe("hello-anchor", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.HelloAnchor as Program<HelloAnchor>;

  const counterAccount = anchor.web3.Keypair.generate();

  it("Creates a counter", async () => {
    await program.methods.create().accounts({
      counterAccount: counterAccount.publicKey,
      authority: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId
    }).signers([counterAccount]).rpc();

    const account = await program.account.counterAccount.fetch(counterAccount.publicKey);
    console.log('Count 0: ', account.count.toString())
    assert.ok(account.count.toString() == "0");
  });

  it("Increments the counter", async () => {
    await program.methods.increment().accounts({
      counterAccount: counterAccount.publicKey
    }).rpc();

    const account = await program.account.counterAccount.fetch(counterAccount.publicKey);
    console.log('Count 1: ', account.count.toString())
    assert.ok(account.count.toString() == "1");
  })

});
