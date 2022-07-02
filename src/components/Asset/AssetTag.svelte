<script lang="ts">
    let cvs = document.querySelector("canvas.AssetTag_canvas") as HTMLCanvasElement;
    let ctx = cvs.getContext('2d')!;
    ctx.font = '30px Omnes';
    ctx?.fillText('Atento', 30, 0);
    // TODO: Finish Primtable AssetTag Template
</script>

<canvas class="AssetTag_canvas" width="230" height="150" />