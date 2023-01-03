<script lang="ts">
	import type { UserType } from '$lib/types/Types';
	import { Svrollbar } from 'svrollbar';
	import Skeleton from '$lib/components/common/Skeleton.svelte';
	import { nodeProvider } from '$lib/stores/Network';
	import type { JobType } from '$lib/types/Types';

	export let job: JobType;

	let viewport: Element;
	let contents: Element;

	let user: UserType;
	let nft_image: any;
	let ens_name: string;
	let placeholder_image = 'assets/xcopy.gif';

	$: feedHeight = window.innerHeight - 136;
	$: if (job) {
		nft_image = '';
		fetchUser();
	}

	const fetchUser = async () => {
		const res = await fetch(`/api/user/${job.user_address}`);
		user = await res.json();
		await getNft();
		ens_name = await $nodeProvider.lookupAddress(job.user_address);
	};
	//todo: move to a store
	const getNft = async () => {
		if (user.nft_address && user.nft_id) {
			try {
				const response = await fetch(`api/alchemy/${user.nft_address}/${user.nft_id}`);
				if (response.ok) {
					const data = await response.json();
					nft_image = data.image;
				}
			} catch (err) {
				console.log(err);
			}
		}
	};
</script>

<main>
	<div class="profile-bar">
		<div class="left-section">
			<img
				class="pfp"
				src={user?.show_nft
					? nft_image && nft_image != ''
						? nft_image
						: placeholder_image
					: user?.image_url && user.image_url != ''
					? user.image_url
					: placeholder_image}
				alt=""
			/>
			<div style="width:8px;" />
			<div class="info">
				<div class="info-username">
					{#if user?.show_ens && ens_name && ens_name != ''}
						<p>{ens_name}</p>
					{:else if user?.username && user.username != ''}
						<p>{user?.username}</p>
					{:else}
						<Skeleton width="100px" height="20px" />
					{/if}
					<div style="width:4px;" />

					<img src="icons/external.svg" alt="External Link" style="margin-right:8px;" />
				</div>

				<div style="height:4px;" />
				<p class="light-60">{user?.title}</p>
				<div style="height:4px;" />
				<p>4.8<span class="light-60">(377)</span></p>
			</div>
		</div>
		<div class="right-section">
			<div class="button">
				<p class="yellow">apply to this job</p>
			</div>
			<div style="height:8px" />
			<div class="button">
				<p class="light-60">add to watchlist</p>
			</div>
		</div>
	</div>
	<div class="wrapper">
		<div bind:this={viewport} class="viewport" style={`height:${feedHeight.toString() + 'px'}`}>
			<div bind:this={contents} class="contents">
				<div style="height:12px;" />
				<div class="description">
					<div class="body-text light-80">
						{job.description}
					</div>
				</div>
				<div style="height:12px;" />
				<div class="links">
					{#each job.links as link}
						<div class="link-container">
							<p class="placeholder light-40">link</p>
							<div style="width:8px;" />
							<a href={link}>
								<p class="light-80">{link}</p>
							</a>
						</div>
						<div style="height:8px;" />
					{/each}
				</div>
				<div style="height:32px;" />
			</div>
		</div>
		<Svrollbar alwaysVisible {viewport} {contents} />
	</div>
</main>

<style>
	main {
		width: 520px;
		display: flex;
		flex-direction: column;
	}
	.profile-bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-width: 1px 1px 1px 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		cursor: pointer;
		padding: 12px;
	}
	.left-section {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
	}
	.pfp {
		width: 60px;
		height: 60px;
	}
	.info {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.info-username {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.description {
		border-width: 1px 1px 1px 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		padding: 12px;
	}
	.link-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-20);
	}
	.placeholder {
		padding: 8px 12px;
		border-width: 0px 1px 0px 0px;
		border-style: solid;
		border-color: var(--color-light-20);
	}
	.wrapper {
		position: relative;
		-ms-overflow-style: none; /* for Internet Explorer, Edge */
		scrollbar-width: none; /* for Firefox */
		overflow-y: scroll;
		--svrollbar-track-width: 1px;
		/* --svrollbar-track-background: #85b4b9; */
		--svrollbar-track-opacity: 1;

		--svrollbar-thumb-width: 10px;
		--svrollbar-thumb-background: #d9ab55;
		--svrollbar-thumb-opacity: 1;
	}

	.viewport {
		position: relative;
		overflow: scroll;
		box-sizing: border-box;

		/* hide scrollbar */
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.viewport::-webkit-scrollbar {
		/* hide scrollbar */
		display: none;
	}
	.button {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-light-20);
		padding: 4px 8px;
		cursor: pointer;
	}
	.button:hover {
		background-color: var(--color-primary);
	}
	.button:hover p {
		color: var(--color-dark);
	}
</style>