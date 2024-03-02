/*import { queryClaim, AmbientClaim, RangeClaim, queryPos, AmbientLiqPos, RangeLiqPos, queryPosAnchors } from "../position";
import { ethers } from "ethers";
import { NODE_URL } from "..";

let ropstenProvider = new ethers.providers.JsonRpcProvider(NODE_URL);
const ambPos = "0x83143c5d6e1dadd337e7d8618d6c0bf50bdfd154f08c7f9310dda845cf77ad53"
const ambMintTx = "0x18510df1077eed4a0d7f77dfffbe85ae215e0a1c730c919df6ad8b655ed836bd"

const concPos = "0xf264f3cd87277c5d536c08d094f4cd23707a7fb7c8da08b44c0dc25bea3b9b54"
const concMintTx = "0x1b3e525796cb97ef7a2bf69736cca37fe70f09cfb907b9d4516d1ce065e29727"

test("ambient claim", async () => {
    let claim = await queryClaim(ambPos, ambMintTx, ropstenProvider) as AmbientClaim
    expect(claim.lpType).toBe('ambient')
    expect(claim.baseToken).toBe("0x0000000000000000000000000000000000000000")
    expect(claim.quoteToken).toBe("0x07865c6E87B9F70255377e024ace6630C1Eaa37F")    
    expect(claim.poolType).toBe(35000)
    expect(claim.owner).toBe("0x01e650ABfc761C6A0Fc60f62A4E4b3832bb1178b")
    expect(claim.ambientSeeds.toString()).toBe("10133289728342")
});

test("concentrated liq claim", async () => {
    let claim = await queryClaim(concPos, concMintTx, ropstenProvider) as RangeClaim
    expect(claim.lpType).toBe('range')
    expect(claim.baseToken).toBe("0x0000000000000000000000000000000000000000")
    expect(claim.quoteToken).toBe("0xaD6D458402F60fD3Bd25163575031ACDce07538D")    
    expect(claim.poolType).toBe(35000)
    expect(claim.lowerTick).toBe(-69090)
    expect(claim.upperTick).toBe(-52980)
    expect(claim.owner).toBe("0x01e650ABfc761C6A0Fc60f62A4E4b3832bb1178b")
    expect(claim.concLiq.toString()).toBe("277973882314227712")
    expect(claim.feeMileage).toBe(0)
});

test("ambient pos", async() => {
    let pos = await queryPos(ambPos, ambMintTx, ropstenProvider) as AmbientLiqPos
    expect(pos.ambientLiq.toString()).toBe("10136610108002")
    expect(pos.quoteQty.toString()).toBe("150371202")    
    expect(pos.baseQty.toString()).toBe("683314779938488320")
})

test("conc pos", async() => {
    let pos = await queryPos(concPos, concMintTx, ropstenProvider) as RangeLiqPos
    expect(pos.quoteQty.toString()).toBe("0")    
    expect(pos.baseQty.toString()).toBe("10875090476728320")
})

test("query anchors", async() => {
    const dummyTx = "0xe06b914ab50fe192d78fc4c6dbdfbd8395443d071e394f15e8b1b38524fbe6a5"
    const dummyPos = "0x0"
    const anchors = [{ tx: dummyTx, pos: dummyPos}, { tx: dummyTx, pos: ambPos},
        { tx: ambMintTx, pos: ambPos}, { tx: dummyTx, pos: concPos},
        { tx: concMintTx, pos: concPos}]
    let pos = await queryPosAnchors(anchors, ropstenProvider)
    console.log(pos)
})*/