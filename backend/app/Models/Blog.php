<?php

/**
 * This File contains the blogs model and its
 * related relationships
 *
 * PHP version 8
 *
 * @category  Models
 * @package    App\Models
 * @author     Kibooli Felix <kiboolif@gmail.com>
 * @license  MIT (https://opensource.org/licenses/MIT)
 * @link       https://github.com/KIBOOLI-FELIX/mribrahimsite.git
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * This is a blog model class that
 * handles blog posts
 *
 * PHP version 8
 *
 * @category  Models
 * @package    App\Models
 * @author     Kibooli Felix <kiboolif@gmail.com>
 * @license  MIT (https://opensource.org/licenses/MIT)
 * @link       https://github.com/KIBOOLI-FELIX/mribrahimsite.git
 */
class Blog extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'user_id',
        'slug',
        'content',
        'excerpt',
        'status',
        'image',
        'published_at'
    ];

    /**
     * This function retrieves all posts by a specific user
     *
     * @return void
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * This retrieves all the images of a given post
     *
     * @return void
     */
    public function images()
    {
        return $this->hasMany(BlogImage::class);
    }
}
