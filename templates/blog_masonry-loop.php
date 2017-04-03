<?php
global $qode_options_proya;
$blog_hide_comments = "";
if (isset($qode_options_proya['blog_hide_comments'])) {
	$blog_hide_comments = $qode_options_proya['blog_hide_comments'];
}
$qode_like = "on";
if (isset($qode_options_proya['qode_like'])) {
	$qode_like = $qode_options_proya['qode_like'];
}
?>
<?php
$_post_format = get_post_format();
?>
<?php
	switch ($_post_format) {
		case "audio":
?>
		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
			<div class="post_image">
				<audio class="blog_audio" src="<?php echo get_post_meta(get_the_ID(), "audio_link", true) ?>" controls="controls">
					<?php _e("Your browser don't support audio player","qode"); ?>
				</audio>
			</div>
			<div class="post_text">
				<div class="post_text_inner">
					<h5 itemprop="name" class="entry_title"><a itemprop="url" href="<?php the_permalink(); ?>" target="_self" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></h5>
					<?php qode_excerpt(); ?>
					<div class="post_info">
						<span itemprop="dateCreated" class="time entry_date updated"><?php the_time('d F, Y'); ?><meta itemprop="interactionCount" content="UserComments: <?php echo get_comments_number(qode_get_page_id()); ?>"/></span>
						<?php if($blog_hide_comments != "yes"){ ?>
							 / <a itemprop="url" class="post_comments" href="<?php comments_link(); ?>" target="_self"><?php comments_number('0 ' . __('Comments','qode'), '1 '.__('Comment','qode'), '% '.__('Comments','qode') ); ?></a>
						<?php } ?>
					</div>
				</div>
			</div>
		</article>
<?php
		break;
		case "link":
?>
			<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
				<div class="post_content_holder">
					<div class="post_text">
						<div class="post_text_inner">
							<div class="post_info">
								<span itemprop="dateCreated" class="time entry_date updated"><?php the_time('d F, Y'); ?><meta itemprop="interactionCount" content="UserComments: <?php echo get_comments_number(qode_get_page_id()); ?>"/></span>
								<?php if($blog_hide_comments != "yes"){ ?>
								 / <a itemprop="url" class="post_comments" href="<?php comments_link(); ?>" target="_self"><?php comments_number('0 ' . __('Comments','qode'), '1 '.__('Comment','qode'), '% '.__('Comments','qode') ); ?></a>
								<?php } ?>
							</div>
							<i class="link_mark fa fa-link pull-left"></i>
							<div class="post_title entry_title">
								<p><a itemprop="url" href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></p>
							</div>
						</div>
					</div>
				</div>
			</article>
<?php
		break;
		case "gallery":
?>
			<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
				<div class="post_image">
					<div class="flexslider">
						<ul class="slides">
							<?php
								$post_content = get_the_content();
								preg_match('/\[gallery.*ids=.(.*).\]/', $post_content, $ids);
								$array_id = explode(",", $ids[1]);

								foreach($array_id as $img_id){ ?>
									<li><a itemprop="url" target="_self" href="<?php the_permalink(); ?>"><?php echo wp_get_attachment_image( $img_id, 'full' ); ?></a></li>
								<?php } ?>
						</ul>
					</div>
				</div>
				<div class="post_text">
					<div class="post_text_inner">
						<h5 itemprop="name" class="entry_title"><a itemprop="url" href="<?php the_permalink(); ?>" target="_self" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></h5>
						<?php qode_excerpt(); ?>
						<div class="post_info">
							<span itemprop="dateCreated" class="time entry_date updated"><?php the_time('d F, Y'); ?><meta itemprop="interactionCount" content="UserComments: <?php echo get_comments_number(qode_get_page_id()); ?>"/></span>
							<?php if($blog_hide_comments != "yes"){ ?>
								 / <a itemprop="url" class="post_comments" href="<?php comments_link(); ?>" target="_self"><?php comments_number('0 ' . __('Comments','qode'), '1 '.__('Comment','qode'), '% '.__('Comments','qode') ); ?></a>
							<?php } ?>
						</div>
					</div>
				</div>
			</article>
<?php
		break;
		case "quote":
?>
		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
			<div class="post_content_holder">
				<div class="post_text">
					<div class="post_text_inner">
						<div class="post_info">
							<span itemprop="dateCreated" class="time entry_date updated"><?php the_time('d F, Y'); ?><meta itemprop="interactionCount" content="UserComments: <?php echo get_comments_number(qode_get_page_id()); ?>"/></span>
							<?php if($blog_hide_comments != "yes"){ ?>
							 / <a itemprop="url" class="post_comments" href="<?php comments_link(); ?>" target="_self"><?php comments_number('0 ' . __('Comments','qode'), '1 '.__('Comment','qode'), '% '.__('Comments','qode') ); ?></a>
							<?php } ?>
						</div>
						<i class="qoute_mark fa fa-quote-right pull-left"></i>
						<div class="post_title entry_title">
							<p><a itemprop="url" href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"><?php echo get_post_meta(get_the_ID(), "quote_format", true); ?></a></p>
							<span class="quote_author">&mdash; <?php the_title(); ?></span>
						</div>
					</div>
				</div>
			</div>
		</article>
<?php
		break;
		default:
?>
		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
			<?php if ( has_post_thumbnail() ) { ?>
				<div class="post_image">
					<a itemprop="url" href="<?php the_permalink(); ?>" target="_self" title="<?php the_title_attribute(); ?>">
						<?php the_post_thumbnail('full'); ?>
					</a>
				</div>
			<?php } ?>
			<div class="post_text">
				<div class="post_text_inner">
                    <span class="post_category"><?php the_category(', '); ?></span>
					<h5 itemprop="name" class="entry_title"><a itemprop="url" href="<?php the_permalink(); ?>" target="_self" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></h5>
					<?php qode_excerpt(); ?>
					<div class="post_info">
						<span itemprop="dateCreated" class="time entry_date updated"><?php the_time('d F, Y'); ?><meta itemprop="interactionCount" content="UserComments: <?php echo get_comments_number(qode_get_page_id()); ?>"/></span>
						<?php if($blog_hide_comments != "yes"){ ?>
							 / <a itemprop="url" class="post_comments" href="<?php comments_link(); ?>" target="_self"><?php comments_number('0 ' . __('Comments','qode'), '1 '.__('Comment','qode'), '% '.__('Comments','qode') ); ?></a>
						<?php } ?>
					</div>
				</div>
			</div>
		</article>
<?php
}
?>
