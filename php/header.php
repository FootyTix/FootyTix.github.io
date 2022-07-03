<?php
if ( !defined( 'ABSPATH' ) ) {
	exit;
}

$display_search_box = !empty( get_option( 'stl_header_searchform' ) ) ? true : false;

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name'); ?> RSS Feed" href="<?php bloginfo('rss2_url'); ?>">
<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
<link rel="preconnect" href="https://pagead2.googlesyndication.com" crossorigin>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="preconnect" href="https://googleads.g.doubleclick.net" crossorigin>
<link rel="preconnect" href="https://stats.g.doubleclick.net" crossorigin>
<link rel="preconnect" href="https://static.doubleclick.net" crossorigin>
<?php
get_template_part( 'header-parts/add-style-before' );
get_template_part( 'header-parts/inline-styles' );
get_template_part( 'header-parts/head-seo' );
get_template_part( 'header-parts/ogp-facebook' );
get_template_part( 'header-parts/twitter-card' );
wp_head();
get_template_part( 'header-parts/add-style' );

if ( is_singular() ) {
	$inline_css = get_post_meta( $post->ID, 'inline_css', true );
	if( !empty( $inline_css ) ) echo '<style>' .  $inline_css . '</style>';
}
?>
<?php get_template_part( 'header-parts/adsense-auto' ); ?>
<?php get_template_part( 'header-parts/analytics-tag' ); ?>
<?php echo get_option( 'stl_add_element_head', '' ); ?>
<!-- custom start -->
	<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>

<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>	
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>

<script defer src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
<!-- custom end -->
</head>
<body <?php body_class( stl_setting_body_class() );?>>
	<div class="container<?php echo stl_setting_container_class(); ?>">
		<header class="header<?php echo stl_setting_header_class(); ?>" id="header">
			<?php get_template_part( 'header-parts/global-nav-sp' ); ?>
			<div class="header__inner" id="js-header-inner">
				<?php get_template_part( 'header-parts/site-title' ); ?>
				<?php if( $display_search_box ) get_template_part( 'header-parts/header-search-box' ); ?>
				<?php get_template_part( 'header-parts/global-nav' ); ?>
			</div>
		</header><!-- /header -->
		<?php get_template_part( 'header-parts/header-info' ); ?>