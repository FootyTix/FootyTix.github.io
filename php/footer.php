<?php 
if ( !defined( 'ABSPATH' ) ) {
  exit;
}
?>
	<div class="back-to-top">
		<a class="back-to-top__button customize-bg-accent-color" id="js-button" href="#" aria-label="ページトップに戻る">
			<i class="fas fa-chevron-up"></i>
		</a>
	</div>
	<footer class="footer" id="footer">
		<div class="footer__inner">
			<?php get_template_part( 'footer-parts/footer-widget' ); ?>
		</div>
		<?php if( has_nav_menu( 'footer' ) ) : ?>
			<div class="footer-nav-wrap">
				<?php 
					wp_nav_menu( array(
					'theme_location' => 'footer',
					'menu_class'      => 'footer-nav__list',
					'container'      => 'nav',
					'container_class'=> 'footer-nav',
					'depth'          => 1,
					) );
				?>
			</div>
		<?php endif; ?>
		<?php get_template_part( 'footer-parts/copyright' ); ?>
	</footer>
  </div><!-- .container -->
<?php wp_footer(); ?>
<?php
$use_slider = ! empty( get_option( 'stl_pickup_entry_id' ) ) ? true : false ;

if( is_home() && $use_slider ) get_template_part( 'footer-parts/slider-script' );

$font = get_option( 'stl_select_font' );
$font_array = array(
	'noto-sans' => 'https://fonts.googleapis.com/earlyaccess/notosansjapanese.css',
	'm-plus-rounded-1c' => 'https://fonts.googleapis.com/earlyaccess/roundedmplus1c.css',
	'sawarabigothic' => 'https://fonts.googleapis.com/earlyaccess/sawarabigothic.css',
);
?>
<?php if ( ! empty( $font ) && isset( $font_array[$font] ) ) : ?>
	<link href="<?php echo $font_array[$font]; ?>" rel="stylesheet">
<?php endif; ?>
<!-- amazon mobile popup start -->
<script type="text/javascript">
    amzn_assoc_ad_type = "link_enhancement_widget";
    amzn_assoc_tracking_id = "footballticke-22";
    amzn_assoc_linkid = "c9b745948dec91da6490f7276478658b";
    amzn_assoc_placement = "";
    amzn_assoc_marketplace = "amazon";
    amzn_assoc_region = "JP";
</script>
<script src="//ws-fe.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&Operation=GetScript&ID=OneJS&WS=1&MarketPlace=JP"></script>
<!-- amazon mobile popup end -->
</body>
</html>