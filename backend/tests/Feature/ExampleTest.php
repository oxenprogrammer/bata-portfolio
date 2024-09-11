<?php
/**
 * ExampleTest Class
 *
 * This file contains tests for basic application functionality.
 * It ensures that the application returns a successful response
 * for the root URL.
 *
 * @category Tests
 * @package  Tests\Feature
 * @version  1.0
 * @author   Kibooli Felix <kiboolif@gmail.com>
 * @license  MIT (https://opensource.org/licenses/MIT)
 * @link     https://github.com/KIBOOLI-FELIX/mribrahimsite.git
 */

namespace Tests\Feature;

use Tests\TestCase;

/**
 * Feature test class for the example test
 *
 * Tests basic application functionality.
 *
 * @category Tests
 * @package  Tests\Feature
 * @version  1.0
 * @author   Kibooli Felix <kiboolif@gmail.com>
 * @license  MIT (https://opensource.org/licenses/MIT)
 * @link     https://github.com/KIBOOLI-FELIX/mribrahimsite.git
 */
class ExampleTest extends TestCase
{
    /**
     * Test that the application returns a successful response.
     *
     * @return void
     */
    public function testApplicationReturnsSuccessfulResponse(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
