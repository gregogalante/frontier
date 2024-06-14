alice: ./target/release/frontier-template-node purge-chain --base-path /tmp/alice --chain local -y && ./target/release/frontier-template-node --base-path /tmp/alice --chain local --alice --port 30333 --rpc-port 9945 --node-key 0000000000000000000000000000000000000000000000000000000000000001 --telemetry-url "wss://telemetry.polkadot.io/submit/ 0" --validator

bob: sleep 5 && ./target/release/frontier-template-node purge-chain --base-path /tmp/bob --chain local -y && ./target/release/frontier-template-node --base-path /tmp/bob --chain local --bob --port 30334 --rpc-port 9946 --telemetry-url "wss://telemetry.polkadot.io/submit/ 0" --validator --bootnodes /ip4/127.0.0.1/tcp/30333/p2p/12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp

_devclients: cd _devclients && yarn install && yarn start