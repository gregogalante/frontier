# Polkadot Frontier

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/polkadot-evm/frontier/test.yml)](https://github.com/polkadot-evm/frontier/actions)
[![Matrix](https://img.shields.io/matrix/frontier:matrix.org)](https://matrix.to/#/#frontier:matrix.org)

Frontier is the EVM backbone of Polkadot.

## Features

Frontier provides a compatibility layer of EVM, so that you can run any Ethereum dapps on Polkadot, unmodified.
Using Frontier, you get access to all the Ethereum RPC APIs you are already familiar with, and therefore you can continue to develop your dapps in your favourite Ethereum developer tools.
As a bonus, you can even run many Ethereum L2s inside Frontier!
For those looking to become acquainted with Frontier, consult the documentation provided [here](./docs).
Additionally, a [template node](./template/README.md) is available to facilitate a more comprehensive technical exploration.

Frontier is also a migration framework.
Besides the common strategy of direct state export/import and transaction-level replays, Frontier's Pre-Log Wrapper Block feature provides a possible method for a zero-downtime live migration.

## Development workflow

### Pull request

All changes (except new releases) are handled through pull requests.

### Versioning

Frontier follows [Semantic Versioning](https://semver.org/).
An unreleased crate in the repository will have the `-dev` suffix in the end, and we do rolling releases.

When you make a pull request against this repository, please also update the affected crates' versions, using the following rules.
Note that the rules should be applied recursively -- if a change modifies any upper crate's dependency (even just the `Cargo.toml` file),
then the upper crate will also need to apply those rules.

Additionally, if your change is notable, then you should also modify the corresponding `CHANGELOG.md` file, in the "Unreleased" section.

If the affected crate already has `-dev` suffix:

* If your change is a patch, then you do not have to update any versions.
* If your change introduces a new feature, please check if the local version already had its minor version bumped, if not, bump it.
* If your change modifies the current interface, please check if the local version already had its major version bumped, if not, bump it.

If the affected crate does not yet have `-dev` suffix:

* If your change is a patch, then bump the patch version, and add `-dev` suffix.
* If your change introduces a new feature, then bump the minor version, and add `-dev` suffix.
* If your change modifies the current interface, then bump the major version, and add `-dev` suffix.

If your pull request introduces a new crate, please set its version to `1.0.0-dev`.

# FORK DOCS

## Basic run

**Build the project:**

```bash
cargo build # to check if the project compiles
cargo build --release # to compile the project with optimizations
```

**Execute the chain:**

```bash
./target/release/frontier-template-node --dev
```

**View chain from block explorer:**

Visit: [https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/explorer](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/explorer)

## Run multiple nodes

**Run first node Alice:**

```bash
./target/release/frontier-template-node purge-chain --base-path /tmp/alice --chain local -y

./target/release/frontier-template-node \
--base-path /tmp/alice \
--chain local \
--alice \
--port 30333 \
--rpc-port 9944 \
--node-key 0000000000000000000000000000000000000000000000000000000000000001 \
--telemetry-url "wss://telemetry.polkadot.io/submit/ 0" \
--validator
```

**Run second node Bob:**

```bash
./target/release/frontier-template-node purge-chain --base-path /tmp/bob --chain local -y

./target/release/frontier-template-node \
--base-path /tmp/bob \
--chain local \
--bob \
--port 30334 \
--rpc-port 9945 \
--telemetry-url "wss://telemetry.polkadot.io/submit/ 0" \
--validator \
--bootnodes /ip4/127.0.0.1/tcp/30333/p2p/12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp
```

NOTE: In case of problems with secret:

```bash
mkdir -p /tmp/bob/chains/local_testnet/network
./target/release/frontier-template-node key generate-node-key --file /tmp/bob/chains/local_testnet/network/secret_ed25519
```

**View chain from block explorer:**

Visit: [https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/explorer](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/explorer)

**Run all in one command:**

```bash
foreman start
```
