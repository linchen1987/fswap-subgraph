import { BigInt, log } from '@graphprotocol/graph-ts';

import { CollateralReserved, MintingExecuted, RedemptionPerformed, RedemptionDefault, RedemptionPaymentBlocked, RedemptionRejected } from '../generated/AssetManager/AssetManager';

import { CollateralReservedEvent, FAssetEvent } from '../generated/schema';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export function handleCollateralReserved(ev: CollateralReserved): void {
  let event = new CollateralReservedEvent(ev.params.collateralReservationId.toString());

  event.txHash = ev.transaction.hash.toHexString();
  event.minter = ev.transaction.from.toHexString();

  log.info('[FAsset] Saving CollateralReservedEvent with id: {}, minter: {}, txHash: {}', [event.id, event.minter, event.txHash]);

  event.save();
}

export function handleMintingExecuted(ev: MintingExecuted): void {
  let collateralEvent = CollateralReservedEvent.load(ev.params.collateralReservationId.toString());

  // Create FAssetEvent with transaction hash as id
  let event = new FAssetEvent(ev.transaction.hash.toHexString());

  if (collateralEvent) {
    event.user = collateralEvent.minter;
    log.info('[FAsset] Found CollateralReservedEvent for id: {}, minter: {}', [ev.params.collateralReservationId.toString(), collateralEvent.minter]);
  } else {
    log.warning('[FAsset] CollateralReservedEvent not found for id: {}', [ev.params.collateralReservationId.toString()]);
    event.user = ZERO_ADDRESS;
  }

  event.type = 'mint';
  event.status = 'MintingExecuted';
  event.collateralReservationId = ev.params.collateralReservationId;
  event.created = ev.block.timestamp;
  event.updated = ev.block.timestamp;

  log.info('[FAsset] Saving FAssetEvent with id: {}, user: {}, type: {}, status: {}', [event.id, event.user, event.type, event.status]);

  event.save();
}

export function handleRedemptionPerformed(ev: RedemptionPerformed): void {
  // Create FAssetEvent with transaction hash as id
  let event = new FAssetEvent(ev.transaction.hash.toHexString());

  // Set the user to the redeemer address
  event.user = ev.params.redeemer.toHexString();

  event.type = 'redeem';
  event.status = 'RedemptionPerformed';

  // Convert uint64 requestId to BigInt
  let requestIdBigInt = BigInt.fromI32(0);
  requestIdBigInt = BigInt.fromString(ev.params.requestId.toString());
  event.redeemRequestId = requestIdBigInt;

  event.redeemUnderlyingTxHash = ev.params.transactionHash.toHexString();
  event.created = ev.block.timestamp;
  event.updated = ev.block.timestamp;

  log.info('[FAsset] Saving RedemptionPerformed FAssetEvent with id: {}, user: {}, requestId: {}', [event.id, event.user, requestIdBigInt.toString()]);

  event.save();
}

export function handleRedemptionDefault(ev: RedemptionDefault): void {
  // Create FAssetEvent with transaction hash as id
  let event = new FAssetEvent(ev.transaction.hash.toHexString());

  // Set the user to the redeemer address
  event.user = ev.params.redeemer.toHexString();

  event.type = 'redeem';
  event.status = 'RedemptionDefault';

  // Convert uint64 requestId to BigInt
  let requestIdBigInt = BigInt.fromI32(0);
  requestIdBigInt = BigInt.fromString(ev.params.requestId.toString());
  event.redeemRequestId = requestIdBigInt;

  event.created = ev.block.timestamp;
  event.updated = ev.block.timestamp;

  log.info('[FAsset] Saving RedemptionDefault FAssetEvent with id: {}, user: {}, requestId: {}', [event.id, event.user, requestIdBigInt.toString()]);

  event.save();
}

export function handleRedemptionPaymentBlocked(ev: RedemptionPaymentBlocked): void {
  // Create FAssetEvent with transaction hash as id
  let event = new FAssetEvent(ev.transaction.hash.toHexString());

  // Set the user to the redeemer address
  event.user = ev.params.redeemer.toHexString();

  event.type = 'redeem';
  event.status = 'RedemptionPaymentBlocked';

  // Convert uint64 requestId to BigInt
  let requestIdBigInt = BigInt.fromI32(0);
  requestIdBigInt = BigInt.fromString(ev.params.requestId.toString());
  event.redeemRequestId = requestIdBigInt;

  event.redeemUnderlyingTxHash = ev.params.transactionHash.toHexString();
  event.created = ev.block.timestamp;
  event.updated = ev.block.timestamp;

  log.info('[FAsset] Saving RedemptionPaymentBlocked FAssetEvent with id: {}, user: {}, requestId: {}', [event.id, event.user, requestIdBigInt.toString()]);

  event.save();
}

export function handleRedemptionRejected(ev: RedemptionRejected): void {
  // Create FAssetEvent with transaction hash as id
  let event = new FAssetEvent(ev.transaction.hash.toHexString());

  // Set the user to the redeemer address
  event.user = ev.params.redeemer.toHexString();

  event.type = 'redeem';
  event.status = 'RedemptionRejected';

  // Convert uint64 requestId to BigInt
  let requestIdBigInt = BigInt.fromI32(0);
  requestIdBigInt = BigInt.fromString(ev.params.requestId.toString());
  event.redeemRequestId = requestIdBigInt;

  event.created = ev.block.timestamp;
  event.updated = ev.block.timestamp;

  log.info('[FAsset] Saving RedemptionRejected FAssetEvent with id: {}, user: {}, requestId: {}', [event.id, event.user, requestIdBigInt.toString()]);

  event.save();
}
