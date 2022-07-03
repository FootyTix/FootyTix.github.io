<?php
if ( !defined( 'ABSPATH' ) ) {
  exit;
}

$datetime = get_the_date('Y-m-d');
$update_time = get_the_modified_date('Y-m-d');
$display_date_type = get_option( 'stl_date_type_archive', 'post' );
if ( $display_date_type === 'none' ) return;
?>
<div class="entries-item__date">
	<?php if( $display_date_type === 'post' ) : ?>
		<time datetime="<?php echo $datetime; ?>" class="entries-item__time"><?php echo get_the_date('Y.m.d'); ?></time>
	<?php elseif ( $display_date_type === 'update' ) : ?>
		<?php if( $datetime === $update_time ) : ?>
			<time datetime="<?php echo $datetime; ?>" class="entries-item__time entries-item__time--update"><?php echo get_the_date('Y.m.d'); ?></time>
		<?php else : ?>
			<time datetime="<?php echo $update_time; ?>" class="entries-item__time entries-item-<?php echo $update_time; ?>__time entries-item__time--update"><?php echo get_the_modified_date('Y.m.d'); ?></time>
		<?php endif; ?>
	<?php elseif ( $display_date_type === 'post-update' ) : ?>
		<?php if( $datetime === $update_time ) : ?>
			<time datetime="<?php echo $datetime; ?>" class="entries-item__time"><?php echo get_the_date('Y.m.d'); ?></time>
		<?php else : ?>
			<time datetime="<?php echo $datetime; ?>" class="entries-item__time"><?php echo get_the_date('Y.m.d'); ?></time>
			<time datetime="<?php echo $update_time; ?>" class="entries-item__time entries-item-<?php echo $update_time; ?>__time entries-item__time--update"><?php echo get_the_modified_date('Y.m.d'); ?></time>
		<?php endif; ?>
	<?php endif; ?>
</div>