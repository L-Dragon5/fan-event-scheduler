<?php

use Illuminate\Support\Facades\DB;
use Intervention\Image\Facades\Image;

/**
 * Strip special characters and lowercase string.
 */
if (!function_exists('strip_and_lower')) {
  /**
   * Strip unnecessary character and set to lowercase.
   * 
   * @param  string  $string
   * @return string
   */
  function strip_and_lower($string) {
    return strtolower(preg_replace('/[^a-zA-Z0-9-_\.]/', '', $string));
  }
}

/**
 * Return a json encoded message.
 */
if (!function_exists('return_json_message')) {
  /**
   * Return Laravel Response that is JSON encoded with data
   * 
   * @param  string  $message
   * @param  string  $statusCode
   * @param  array  $extraArray
   * @return \Illuminate\Http\Response
   */
  function return_json_message($message, $statusCode, $extraArray = null) {
    $return = ['message' => $message];
    
    if (!empty($extraArray)) {
      $return = array_merge($return, $extraArray);
    }
    
    return response()->json($return, $statusCode);
  }
}

/**
 * Check for duplicate entry.
 */
if (!function_exists('check_for_duplicate')) {
  /**
   * Check for duplicate title in database table.
   * 
   * @param  array  $id_array
   * @param  string  $title
   * @param  string  $db_table
   * @param  string  $column_name
   * @return bool
   */
  function check_for_duplicate($id_array, $title, $db_table, $column_name) {
    $t = strip_and_lower($title);
    $id_value = current($id_array);
    $id_name = key($id_array);
    $entries = DB::table($db_table)->where($id_name, $id_value)->pluck($column_name);

    foreach ($entries as $entry) {
      if ($t === strip_and_lower($entry)) {
        return true;
      }
    }

    return false;
  }
}

/**
 * Save image from uploaded.
 */
if (!function_exists('save_image_uploaded')) {
  /**
   * Save image from file uploaded.
   * 
   * @param  string|array  $file
   * @param  string  $location
   * @param  int  $width
   * @param  int  $height
   * @param  string  $old_image_path
   * @return string
   */
  function save_image_uploaded($file, $location, $width = null, $height = null, $old_image_path = null) {
    // Create directory if it doesn't exist
    if (!file_exists(storage_path("app/public/$location/"))) {
      mkdir(storage_path("app/public/$location/"), 775, true);
    }

    // Set return value
    $return_path = '';

    // Check for multiple images
    if (is_array($file)) {
      foreach ($file as $img) {
        $return_path .= _store_file($img, $location, $width, $height);
      }
    } else {
      $return_path .= _store_file($file, $location, $width, $height);
    }

    // Check if editing image path
    if (!empty($old_image_path)) {
      $full_path = storage_path('app/public/' . $old_image_path);
      if (file_exists($full_path)) {
        unlink($full_path);
      }
    }

    // Return image storage path
    return $return_path;
  }

  /**
   * Store image and get path.
   * 
   * @param  string|array  $file
   * @param  string  $location
   * @param  int  $width
   * @param  int  $height
   * @return string
   */
  function _store_file($img, $location, $width, $height) {
    // If Base64 String image
    if (is_string($img)) {
      list($extension, $img) = explode(';', $img);
      list(, $img) = explode(',', $img);

      $extension = substr($extension, 11);
      $filename_to_store = bin2hex(random_bytes(5)) . '_' . time() . '.' . $extension;
    } else {
      // Get filenames
      $filename_with_ext = $img->getClientOriginalName();
      $filename = pathinfo($filename_with_ext, PATHINFO_FILENAME);
      $extension = $img->getClientOriginalExtension();
      $filename_to_store = $filename . '_' . time() . '.' . $extension;
    }

    // Create image, resize, and save
    $final_img = Image::make($img);
    
    if (!empty($width) || !empty($height)) {
      $final_img->resize($width, $height, function ($constraint) {
        $constraint->aspectRatio();
        $constraint->upsize();
      });
    }

    $final_img->save(storage_path("app/public/$location/$filename_to_store"), 100);

    return "$location/$filename_to_store";
  }
}
