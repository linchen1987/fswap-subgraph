# FAsset Subgraph

## Deploy Subgraph to Local

### Prepare and Deploy Your Subgraph

Modify `subgraph.yaml`: Ensure the `dataSources.network` field matches the `<network-name>` you set in the `ethereum` environment variable in `docker-compose.yml` (e.g., `mainnet` or `dev`).

Modify `dataSources.source.address` to point to the correct contract address.

Generate code and build:
```bash
graph codegen # Generate AssemblyScript types from schema.graphql
graph build   # Compile Subgraph to Wasm
```

Create a Subgraph instance on your local Graph Node:

- `<subgraph-name>`: The name you want to give your Subgraph, usually in the format `your-github-account/your-subgraph-name`.
- `--node`: Points to the management API endpoint of your local Graph Node (configured as 8020 in `docker-compose.yml`).

```bash
graph create --node http://127.0.0.1:8020/ <subgraph-name>

# e.g. graph create --node http://127.0.0.1:8020/ fasset-test
```

### Deploy Subgraph to Local Node
- `--ipfs`: Points to the API endpoint of your local IPFS node (configured as 5001 in `docker-compose.yml`).
- `--node`: Also points to the management API endpoint of your local Graph Node (8020).

```bash
graph deploy --node http://127.0.0.1:8020/ --ipfs http://127.0.0.1:5001/ <subgraph-name>
# e.g. graph deploy --node http://127.0.0.1:8020 --ipfs http://127.0.0.1:5001 fasset-test
```

The deploy command uploads Subgraph files to local IPFS, then instructs the local Graph Node to start indexing.