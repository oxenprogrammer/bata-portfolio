<?php
/**
 * This File contains the documents model and its
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
 * This is a document model class that
 * handles uploaded documents
 *
 * PHP version 8
 *
 * @category  Models
 * @package    App\Models
 * @author     Kibooli Felix <kiboolif@gmail.com>
 * @license  MIT (https://opensource.org/licenses/MIT)
 * @link       https://github.com/KIBOOLI-FELIX/mribrahimsite.git
 */
class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'title', 'file_size', 'description', 'file_path', 'file_type', 'status',
    ];

    /**
     * This function retrieves the user who uploaded a given document
     *
     * @return void
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
