<script lang="ts">
	export let slot: number;
	export let title: string;
	export let description: string;
	export let image_urls: Array<string>;
	export let minimum_price: number;

	let tags = ['logo design', 'ui/ux', 'nft'];

	$: trimmed_description =
		description.length > 251 ? description.slice(0, 251) + '...' : description;
	let placeholder_image = 'assets/xcopy.gif';
</script>

<section>
	<div class="header">
		<p class="light"><span class="light-40">#{slot + 1} </span>{title}</p>
		<p class="yellow">></p>
	</div>
	<div class="gallery">
		{#each image_urls.slice(0, 4) as url}
			<img src={url == '' ? placeholder_image : url} alt="gallery" class="preview-image" />
		{/each}
	</div>
	<div class="description">
		<div class="light-60 body-text">{trimmed_description}</div>
	</div>
	<div class="tag-bar">
		<div class="tags">
			{#each tags as tag}
				<div class="tag border-all">
					<p class="light-40 link">{tag}</p>
				</div>
				{#if tag != tags[tags.length - 1]}
					<div style="width: 4px" />
				{/if}
			{/each}
		</div>
		<div class="tag border-all">
			<p class="light-40">
				MIN <span class="light">${minimum_price}</span>
			</p>
		</div>
	</div>
</section>

<style>
	section {
		width: 520px;
		flex-direction: column;
		cursor: pointer;
	}
	section:hover {
		background-color: var(--color-light-2);
	}
	section:hover span {
		color: var(--color-primary);
	}
	.header {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 8px 12px;
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
		box-sizing: border-box;
	}
	.gallery {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 8px 12px;
		box-sizing: border-box;
		border-width: 0px 0px 1px 0px;
		border-style: solid;
		border-color: var(--color-light-10);
	}
	.preview-image {
		height: 115px;
		width: 115px;
	}
	.description {
		padding: 8px 12px;
	}
	.tag-bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 4px 12px 12px 12px;
	}
	.tags {
		display: flex;
		flex-direction: row;
	}
	.tag {
		padding: 4px 8px;
	}
	.tag:hover {
		background-color: var(--color-primary);
	}
	.tag:hover p {
		color: var(--color-dark);
	}
	.tag:hover span {
		color: var(--color-dark);
	}
</style>
