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
--rpc-port 9945 \
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
--rpc-port 9946 \
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

Visit: [https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9945#/explorer](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9945#/explorer)

**Run all in one command:**

```bash
foreman start
```

# BACKUP OLD DOCS

<!-- ## Run multiple nodes

**Generate nodes keys:**

NOTE: all nodes have password **1234**

```bash
# FIRST NODE

./target/release/frontier-template-node key generate --scheme Sr25519 --password-interactive
# Secret phrase:     uniform bag ten jelly notice leader face village inflict popular finish vital
# Network ID:        substrate
# Secret seed:       0x9d5e02b88426c7abf4ec3b083846f87ebf7559fce90360332beafc8511b3ed1e
# Public key (hex):  0x7a94ed8378a7c0c77d4d2ad15cbf348718843ebd56af90d3120a7a48fbfb0c00
# Account ID:        0x7a94ed8378a7c0c77d4d2ad15cbf348718843ebd56af90d3120a7a48fbfb0c00
# Public key (SS58): 5EqRwU36zEWq1QoH9jkyJ7uz6aafDkAvN73A4PFZx9E7UEkW
# SS58 Address:      5EqRwU36zEWq1QoH9jkyJ7uz6aafDkAvN73A4PFZx9E7UEkW # put this in the chain-spec file, aura.authorities

./target/release/frontier-template-node key inspect --password-interactive --scheme Ed25519 0x9d5e02b88426c7abf4ec3b083846f87ebf7559fce90360332beafc8511b3ed1e
# Secret Key URI `0x9d5e02b88426c7abf4ec3b083846f87ebf7559fce90360332beafc8511b3ed1e` is account:
# Network ID:        substrate
# Secret seed:       0x9d5e02b88426c7abf4ec3b083846f87ebf7559fce90360332beafc8511b3ed1e
# Public key (hex):  0x69f60bcb1a90de4b1a1a9bfc34861f610a29704f8436cdb90a6f900b441f1ba4
# Account ID:        0x69f60bcb1a90de4b1a1a9bfc34861f610a29704f8436cdb90a6f900b441f1ba4
# Public key (SS58): 5ETdyZXfoAJsGan2TQ8AJnwYYw4QfDAvbhGHkobsBanAKK8A
# SS58 Address:      5ETdyZXfoAJsGan2TQ8AJnwYYw4QfDAvbhGHkobsBanAKK8A # put this in the chain-spec file, grandpa.authorities 

# SECOND NODE

./target/release/frontier-template-node key generate --scheme Sr25519 --password-interactive
# Secret phrase:     shed tape bulk hotel venture winter obtain car stamp egg pull treat
# Network ID:        substrate
# Secret seed:       0xba30f02a9b399a533aab701e49ae048d234edaad35572b5a03dfcb40868fa150
# Public key (hex):  0xd46034839c00e3250ce1adf7893fc53446403f438a523808b59ec7765fc1f41d
# Account ID:        0xd46034839c00e3250ce1adf7893fc53446403f438a523808b59ec7765fc1f41d
# Public key (SS58): 5GsAb2ymmsV98CLCQTzsz57chuJfCjc6CYPs8fmkMC3koKDS
# SS58 Address:      5GsAb2ymmsV98CLCQTzsz57chuJfCjc6CYPs8fmkMC3koKDS # put this in the chain-spec file, aura.authorities

./target/release/frontier-template-node key inspect --password-interactive --scheme Ed25519 0xba30f02a9b399a533aab701e49ae048d234edaad35572b5a03dfcb40868fa150
# Secret Key URI `0xba30f02a9b399a533aab701e49ae048d234edaad35572b5a03dfcb40868fa150` is account:
# Network ID:        substrate
# Secret seed:       0xba30f02a9b399a533aab701e49ae048d234edaad35572b5a03dfcb40868fa150
# Public key (hex):  0x18121caedc288751a0a5b27d092528aa37b56d3c67ed42d16db1a67002281e47
# Account ID:        0x18121caedc288751a0a5b27d092528aa37b56d3c67ed42d16db1a67002281e47
# Public key (SS58): 5CcGPPRoLYEWk3ghnBkGPa8KAc6PCNyw2raXxdaWhB9Yx47B
# SS58 Address:      5CcGPPRoLYEWk3ghnBkGPa8KAc6PCNyw2raXxdaWhB9Yx47B # put this in the chain-spec file, grandpa.authorities
```

**Clone local chain:**

```bash
./target/release/frontier-template-node build-spec --disable-default-bootnode --chain local > _dev.json
# ... Modify the chain spec as needed by adding strings from previous command ...
./target/release/frontier-template-node build-spec --chain=_dev.json --raw --disable-default-bootnode > _devRaw.json
```

**Insert keys to the node folders keystore:**

```bash
# FIRST NODE

./target/release/frontier-template-node key insert --base-path /tmp/node01 \
--chain ./_devRaw.json \
--suri 0x9d5e02b88426c7abf4ec3b083846f87ebf7559fce90360332beafc8511b3ed1e \
--password 1234 \
--key-type aura \
--scheme Sr25519

./target/release/frontier-template-node key insert --base-path /tmp/node01 \
--chain ./_devRaw.json \
--suri 0x9d5e02b88426c7abf4ec3b083846f87ebf7559fce90360332beafc8511b3ed1e \
--password 1234 \
--key-type gran \
--scheme Ed25519

# SECOND NODE

./target/release/frontier-template-node key insert --base-path /tmp/node02 \
--chain ./_devRaw.json \
--suri 0xba30f02a9b399a533aab701e49ae048d234edaad35572b5a03dfcb40868fa150 \
--password 1234 \
--key-type aura \
--scheme Sr25519

./target/release/frontier-template-node key insert --base-path /tmp/node02 \
--chain ./_devRaw.json \
--suri 0xba30f02a9b399a533aab701e49ae048d234edaad35572b5a03dfcb40868fa150 \
--password 1234 \
--key-type gran \
--scheme Ed25519
```

**Run the nodes:**

```bash
./target/release/frontier-template-node purge-chain --base-path /tmp/node01 --chain ./_devRaw.json -y

./target/release/frontier-template-node \
--base-path /tmp/node01 \
--keystore-path /tmp/node01/chains/local_testnet/keystore/ \
--chain ./_devRaw.json \
--port 30333 \
--rpc-port 9944 \
--telemetry-url "wss://telemetry.polkadot.io/submit/ 0" \
--validator \
--rpc-methods Unsafe \
--name Node1 \
--password 1234
``` -->
