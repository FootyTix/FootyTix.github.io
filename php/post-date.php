<?php
if ( !defined( 'ABSPATH' ) ) {
  exit;
}
?>
<?php /* ?> 更新日のみ表示に変更 2022/02/07
<div class="post-date">
	<?php if( get_the_modified_date( 'Ymd' ) > get_the_date( 'Ymd' ) ): ?>
		<i class="far fa-clock"></i><span class="pubdate entry-time"><?php echo get_the_date('Y.m.d'); ?></span>
		<i class="fas fa-history"></i><time class="updated entry-time" datetime="<?php echo get_the_modified_date( 'Y-m-d' ); ?>"><?php echo get_the_modified_date( 'Y.m.d' ); ?></time>
	<?php else: ?>
		<i class="far fa-clock"></i><time class="pubdate entry-time" datetime="<?php echo get_the_date( 'Y-m-d' ); ?>"><?php echo get_the_date('Y.m.d'); ?></time>
	<?php endif; ?>
</div>
<?php */ ?>
<div class="post-date">
	<?php if (get_mtime('c') != null) : ?>
		<i class="fas fa-history"></i><time class="updated entry-time" datetime="<?php if ($mtime = get_mtime('c')) echo $mtime; ?>"><?php echo get_the_modified_date( 'Y.m.d' ); ?></time>
  <?php endif; ?>
  <?php if (get_mtime('c') == null) : ?>
		<i class="far fa-clock"></i><time class="pubdate entry-time" datetime="<?php the_time('c') ;?>">
	<?php echo get_the_date('Y.m.d'); ?></time>
	<?php endif; ?>
</div>
